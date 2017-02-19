/**
 * Gulp tasks
 */

import * as fs from 'fs';
import * as Path from 'path';
import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as babel from 'gulp-babel';
import * as ts from 'gulp-typescript';
import * as tslint from 'gulp-tslint';
import * as glob from 'glob';
import * as es from 'event-stream';
import * as Webpack from 'webpack';
import * as webpack from 'webpack-stream';
import stylus = require('gulp-stylus');
import cssnano = require('gulp-cssnano');
import * as uglify from 'gulp-uglify';
import riotify = require('riotify');
import pug = require('gulp-pug');
import git = require('git-last-commit');
import * as rimraf from 'rimraf';
import * as escapeHtml from 'escape-html';
import prominence = require('prominence');
import * as chalk from 'chalk';
import imagemin = require('gulp-imagemin');
import * as rename from 'gulp-rename';
import named = require('vinyl-named');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const isDebug = !isProduction;

if (isDebug) {
	console.log(chalk.yellow.bold('！！！注意！！！　開発モードが有効です。(成果物の圧縮などはスキップされます)'));
}

if (!fs.existsSync('./.config/default.yml')) {
	console.log('npm run configを実行して設定ファイルを作成してください');
	process.exit();
}

(global as any).MISSKEY_CONFIG_PATH = '.config/default.yml';
import { Config } from './src/config';
const config = eval(require('typescript').transpile(require('fs').readFileSync('./src/config.ts').toString()))() as Config;

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', [
	'build:js',
	'build:ts',
	'build:about:docs',
	'build:copy',
	'build:client'
]);

gulp.task('rebuild', ['clean', 'build']);

gulp.task('build:js', () =>
	gulp.src(['./src/**/*.js', '!./src/web/**/*.js'])
		.pipe(babel({
			presets: ['es2015', 'stage-3']
		}))
		.pipe(gulp.dest('./built/'))
);

gulp.task('build:ts', () =>
	tsProject
		.src()
		.pipe(tsProject())
		.pipe(babel({
			presets: ['es2015', 'stage-3']
		}))
		.pipe(gulp.dest('./built/'))
);

gulp.task('build:about:docs', () => {
	function getLicenseHtml(path: string) {
		return escapeHtml(fs.readFileSync(path, 'utf-8'))
			.replace(/\r\n/g, '\n')
			.replace(/(.)\n(.)/g, '$1 $2')
			.replace(/(^|\n)(.*?)($|\n)/g, '<p>$2</p>');
	}

	function getLicenseSectionHtml(path: string) {
		try {
			const pkg = JSON.parse(fs.readFileSync(Path.parse(path).dir + '/package.json', 'utf-8'));
			const licenseHtml = getLicenseHtml(path);
			return `<details><summary>${pkg.name} <small>v${pkg.version}</small></summary>${licenseHtml}</details>`;
		} catch (e) {
			return null;
		}
	}

	const licenses = glob.sync('./node_modules/**/LICENSE*');
	const licenseHtml = getLicenseHtml('./LICENSE');
	const thirdpartyLicensesHtml = licenses.map(license => getLicenseSectionHtml(license)).join('');
	const pugs = glob.sync('./docs/**/*.pug');
	const streams = pugs.map(file => {
		const page = file.replace('./docs/', '').replace('.pug', '');
		return gulp.src(file)
			.pipe(pug({
				locals: Object.assign({
					path: page,
					license: licenseHtml,
					thirdpartyLicenses: thirdpartyLicensesHtml
				}, config)
			}))
			.pipe(gulp.dest('./built/web/about/pages/' + Path.parse(page).dir));
	});

	return es.merge.apply(es, streams);
});

gulp.task('build:copy', () =>
	es.merge(
		gulp.src([
			'./src/**/resources/**/*',
			'!./src/web/app/**/resources/**/*'
		]).pipe(gulp.dest('./built/')),
		gulp.src([
			'./src/web/about/**/*',
			'!./src/web/about/**/*.pug'
		]).pipe(gulp.dest('./built/web/about/'))
	)
);

gulp.task('test', ['lint', 'build']);

gulp.task('lint', () =>
	gulp.src('./src/**/*.ts')
		.pipe(tslint({
			formatter: 'verbose'
		}))
		.pipe(tslint.report())
);

gulp.task('clean', cb =>
	rimraf('./built', cb)
);

gulp.task('cleanall', ['clean'], cb =>
	rimraf('./node_modules', cb)
);

gulp.task('default', ['build']);

gulp.task('build:client', [
	'build:ts', 'build:js',
	'build:client:scripts',
	'build:client:pug',
	'copy:client'
]);

gulp.task('build:client:scripts', () => new Promise(async (ok) => {
	// Get commit info
	const commit = await prominence(git).getLastCommit();

	const StringReplacePlugin = require('string-replace-webpack-plugin');

	/* webpack options */
	const pack: Webpack.Configuration = {
		entry: {
			'client': './src/web/app/client/script.js',
			'desktop': './src/web/app/desktop/script.js',
			'mobile': './src/web/app/mobile/script.js',
			'dev': './src/web/app/dev/script.js',
			'auth': './src/web/app/auth/script.js'
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.tag$/,
					exclude: /node_modules/,
					loader: StringReplacePlugin.replace({
						replacements: [
							{ pattern: /\$theme\-color\-foreground/g, replacement: () => '#fff' },
							{ pattern: /\$theme\-color/g, replacement: () => config.themeColor },
						]
					})
				},
				{
					test: /\.tag$/,
					exclude: /node_modules/,
					loader: 'riot-tag-loader',
					query: {
						hot: false,
						type: 'livescript',
						style: 'stylus',
						expr: false,
						compact: true,
						parserOptions: {
							style: {
								compress: true
							}
						}
					}
				},
				{
					test: /\.styl$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'stylus-loader'
						}
					]
				}
			]
		},
		plugins: [
			new Webpack.DefinePlugin({
				VERSION: JSON.stringify(commit ? commit.hash : null),
				CONFIG: {
					themeColor: JSON.stringify(config.themeColor),
					apiUrl: JSON.stringify(config.api_url),
					aboutUrl: JSON.stringify(config.about_url),
					devUrl: JSON.stringify(config.dev_url),
					host: JSON.stringify(config.host),
					url: JSON.stringify(config.url),
					recaptcha: {
						siteKey: JSON.stringify(config.recaptcha.siteKey),
					}
				}
			}),
			new StringReplacePlugin(),
		],
		output: {
			filename: '[name]/script.js'
		}
	};

	if (isProduction) {
		// TODO.
		// see https://github.com/webpack/webpack/issues/2545
		//pack.plugins.push(new Webpack.optimize.UglifyJsPlugin())
	}

	let stream = webpack(pack, Webpack);

	// TODO: remove this block
	if (isProduction) {
		stream = stream
			// ↓ https://github.com/mishoo/UglifyJS2/issues/448
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(uglify({
				compress: true
			}));
	}

	stream.pipe(gulp.dest('./built/web/resources/'));

	ok();
}));

gulp.task('build:client:styles', () =>
	gulp.src('./src/web/app/init.styl')
		.pipe(stylus({
			compress: true
		}))
		.pipe(isProduction
			? cssnano({
				safe: true // 高度な圧縮は無効にする (一部デザインが不適切になる場合があるため)
			})
			: gutil.noop())
		.pipe(gulp.dest('./built/web/resources/'))
);

gulp.task('copy:client', [
	'build:client:scripts'
], () =>
	gulp.src([
		'./resources/**/*',
		'./src/web/resources/**/*',
		'./src/web/app/*/resources/**/*'
	])
	.pipe(isProduction ? imagemin() : gutil.noop())
	.pipe(rename(path => {
		path.dirname = path.dirname.replace('resources', '.');
	}))
	.pipe(gulp.dest('./built/web/resources/'))
);

gulp.task('build:client:pug', [
	'copy:client',
	'build:client:scripts',
	'build:client:styles'
], () =>
	gulp.src('./src/web/app/*/view.pug')
		.pipe(pug({
			locals: {
				themeColor: config.themeColor
			}
		}))
		.pipe(gulp.dest('./built/web/app/'))
);
