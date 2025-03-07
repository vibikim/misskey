<template>
<div
	class="mk-deck" :class="[{ isMobile }]"
>
	<XSidebar v-if="!isMobile"/>

	<div class="main">
		<XStatusBars class="statusbars"/>
		<div ref="columnsEl" class="columns" :class="deckStore.reactiveState.columnAlign.value" @contextmenu.self.prevent="onContextmenu">
			<template v-for="ids in layout">
				<!-- sectionを利用しているのは、deck.vue側でcolumnに対してfirst-of-typeを効かせるため -->
				<section
					v-if="ids.length > 1"
					class="folder column"
					:style="columns.filter(c => ids.includes(c.id)).some(c => c.flexible) ? { flex: 1, minWidth: '350px' } : { width: Math.max(...columns.filter(c => ids.includes(c.id)).map(c => c.width)) + 'px' }"
				>
					<DeckColumnCore v-for="id in ids" :ref="id" :key="id" :column="columns.find(c => c.id === id)" :is-stacked="true" @parent-focus="moveFocus(id, $event)"/>
				</section>
				<DeckColumnCore
					v-else
					:ref="ids[0]"
					:key="ids[0]"
					class="column"
					:column="columns.find(c => c.id === ids[0])"
					:is-stacked="false"
					:style="columns.find(c => c.id === ids[0])!.flexible ? { flex: 1, minWidth: '350px' } : { width: columns.find(c => c.id === ids[0])!.width + 'px' }"
					@parent-focus="moveFocus(ids[0], $event)"
				/>
			</template>
			<div v-if="layout.length === 0" class="intro _panel">
				<div>{{ i18n.ts._deck.introduction }}</div>
				<MkButton primary class="add" @click="addColumn">{{ i18n.ts._deck.addColumn }}</MkButton>
				<div>{{ i18n.ts._deck.introduction2 }}</div>
			</div>
			<div class="sideMenu">
				<button v-tooltip.left="i18n.ts._deck.addColumn" class="_button button" @click="addColumn"><i class="fas fa-plus"></i></button>
				<button v-tooltip.left="i18n.ts.settings" class="_button button settings" @click="showSettings"><i class="fas fa-cog"></i></button>
			</div>
		</div>
	</div>

	<div v-if="isMobile" class="buttons">
		<button class="button nav _button" @click="drawerMenuShowing = true"><i class="fas fa-bars"></i><span v-if="menuIndicated" class="indicator"><i class="fas fa-circle"></i></span></button>
		<button class="button home _button" @click="mainRouter.push('/')"><i class="fas fa-home"></i></button>
		<button class="button notifications _button" @click="mainRouter.push('/my/notifications')"><i class="fas fa-bell"></i><span v-if="$i?.hasUnreadNotification" class="indicator"><i class="fas fa-circle"></i></span></button>
		<button class="button post _button" @click="os.post()"><i class="fas fa-pencil-alt"></i></button>
	</div>

	<transition :name="$store.state.animation ? 'menu-back' : ''">
		<div
			v-if="drawerMenuShowing"
			class="menu-back _modalBg"
			@click="drawerMenuShowing = false"
			@touchstart.passive="drawerMenuShowing = false"
		></div>
	</transition>

	<transition :name="$store.state.animation ? 'menu' : ''">
		<XDrawerMenu v-if="drawerMenuShowing" class="menu"/>
	</transition>

	<XCommon/>
</div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, provide, ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import XCommon from './_common_/common.vue';
import { deckStore, addColumn as addColumnToStore, loadDeck } from './deck/deck-store';
import DeckColumnCore from '@/ui/deck/column-core.vue';
import XSidebar from '@/ui/_common_/sidebar.vue';
import XDrawerMenu from '@/ui/_common_/sidebar-for-mobile.vue';
import MkButton from '@/components/ui/button.vue';
import { getScrollContainer } from '@/scripts/scroll';
import * as os from '@/os';
import { menuDef } from '@/menu';
import { $i } from '@/account';
import { i18n } from '@/i18n';
import { mainRouter } from '@/router';
const XStatusBars = defineAsyncComponent(() => import('@/ui/_common_/statusbars.vue'));

mainRouter.navHook = (path): boolean => {
	const noMainColumn = !deckStore.state.columns.some(x => x.type === 'main');
	if (deckStore.state.navWindow || noMainColumn) {
		os.pageWindow(path);
		return true;
	}
	return false;
};

const isMobile = ref(window.innerWidth <= 500);
window.addEventListener('resize', () => {
	isMobile.value = window.innerWidth <= 500;
});

const drawerMenuShowing = ref(false);

const route = 'TODO';
watch(route, () => {
	drawerMenuShowing.value = false;
});

const columns = deckStore.reactiveState.columns;
const layout = deckStore.reactiveState.layout;
const menuIndicated = computed(() => {
	if ($i == null) return false;
	for (const def in menuDef) {
		if (menuDef[def].indicated) return true;
	}
	return false;
});

function showSettings() {
	os.pageWindow('/settings/deck');
}

let columnsEl = $ref<HTMLElement>();

const addColumn = async (ev) => {
	const columns = [
		'main',
		'widgets',
		'notifications',
		'tl',
		'antenna',
		'list',
		'mentions',
		'direct',
	];

	const { canceled, result: column } = await os.select({
		title: i18n.ts._deck.addColumn,
		items: columns.map(column => ({
			value: column, text: i18n.t('_deck._columns.' + column),
		})),
	});
	if (canceled) return;

	addColumnToStore({
		type: column,
		id: uuid(),
		name: i18n.t('_deck._columns.' + column),
		width: 330,
	});
};

const onContextmenu = (ev) => {
	os.contextMenu([{
		text: i18n.ts._deck.addColumn,
		action: addColumn,
	}], ev);
};

provide('shouldSpacerMin', true);

document.documentElement.style.overflowY = 'hidden';
document.documentElement.style.scrollBehavior = 'auto';
window.addEventListener('wheel', (ev) => {
	if (ev.target === columnsEl && ev.deltaX === 0) {
		columnsEl.scrollLeft += ev.deltaY;
	} else if (getScrollContainer(ev.target as HTMLElement) == null && ev.deltaX === 0) {
		columnsEl.scrollLeft += ev.deltaY;
	}
});
loadDeck();

function moveFocus(id: string, direction: 'up' | 'down' | 'left' | 'right') {
	// TODO??
}
</script>

<style lang="scss" scoped>
.menu-enter-active,
.menu-leave-active {
	opacity: 1;
	transform: translateX(0);
	transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
.menu-enter-from,
.menu-leave-active {
	opacity: 0;
	transform: translateX(-240px);
}

.menu-back-enter-active,
.menu-back-leave-active {
	opacity: 1;
	transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
.menu-back-enter-from,
.menu-back-leave-active {
	opacity: 0;
}

.mk-deck {
	$nav-hide-threshold: 650px; // TODO: どこかに集約したい

	// TODO: ここではなくて、各カラムで自身の幅に応じて上書きするようにしたい
	--margin: var(--marginHalf);

	--deckDividerThickness: 5px;

	display: flex;
	// ほんとは単に 100vh と書きたいところだが... https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
	height: calc(var(--vh, 1vh) * 100);
	box-sizing: border-box;
	flex: 1;

	&.isMobile {
		padding-bottom: 100px;
	}

	> .main {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;

		> .columns {
			flex: 1;
			display: flex;
			overflow-x: auto;
			overflow-y: clip;

			&.center {
				> .column:first-of-type {
					margin-left: auto;
				}

				> .column:last-of-type {
					margin-right: auto;
				}
			}

			> .column {
				flex-shrink: 0;
				border-right: solid var(--deckDividerThickness) var(--deckDivider);

				&:first-of-type {
					border-left: solid var(--deckDividerThickness) var(--deckDivider);
				}

				&.folder {
					display: flex;
					flex-direction: column;

					> *:not(:last-of-type) {
						border-bottom: solid var(--deckDividerThickness) var(--deckDivider);
					}
				}
			}

			> .intro {
				padding: 32px;
				height: min-content;
				text-align: center;
				margin: auto;

				> .add {
					margin: 1em auto;
				}
			}

			> .sideMenu {
				flex-shrink: 0;
				margin-right: 0;
				margin-left: auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 32px;

				> .button {
					width: 100%;
					aspect-ratio: 1;
				}
			}
		}
	}

	> .buttons {
		position: fixed;
		z-index: 1000;
		bottom: 0;
		left: 0;
		padding: 16px;
		display: flex;
		width: 100%;
		box-sizing: border-box;

		> .button {
			position: relative;
			flex: 1;
			padding: 0;
			margin: auto;
			height: 64px;
			border-radius: 8px;
			background: var(--panel);
			color: var(--fg);

			&:not(:last-child) {
				margin-right: 12px;
			}

			@media (max-width: 400px) {
				height: 60px;

				&:not(:last-child) {
					margin-right: 8px;
				}
			}

			&:hover {
				background: var(--X2);
			}

			> .indicator {
				position: absolute;
				top: 0;
				left: 0;
				color: var(--indicator);
				font-size: 16px;
				animation: blink 1s infinite;
			}

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}

			> * {
				font-size: 20px;
			}

			&:disabled {
				cursor: default;

				> * {
					opacity: 0.5;
				}
			}
		}
	}

	> .menu-back {
		z-index: 1001;
	}

	> .menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
		// ほんとは単に 100vh と書きたいところだが... https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
		height: calc(var(--vh, 1vh) * 100);
		width: 240px;
		box-sizing: border-box;
		overflow: auto;
		overscroll-behavior: contain;
		background: var(--bg);
	}
}
</style>
