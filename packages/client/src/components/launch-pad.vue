<template>
<MkModal ref="modal" v-slot="{ type, maxHeight }" :prefer-type="preferedModalType" :anchor="anchor" :transparent-bg="true" :src="src" @click="modal.close()" @closed="emit('closed')">
	<div class="szkkfdyq _popup _shadow" :class="{ asDrawer: type === 'drawer' }" :style="{ maxHeight: maxHeight ? maxHeight + 'px' : '' }">
		<div class="main">
			<template v-for="item in items">
				<button v-if="item.action" v-click-anime class="_button" @click="$event => { item.action($event); close(); }">
					<i class="icon" :class="item.icon"></i>
					<div class="text">{{ item.text }}</div>
					<span v-if="item.indicate" class="indicator"><i class="fas fa-circle"></i></span>
				</button>
				<MkA v-else v-click-anime :to="item.to" @click.passive="close()">
					<i class="icon" :class="item.icon"></i>
					<div class="text">{{ item.text }}</div>
					<span v-if="item.indicate" class="indicator"><i class="fas fa-circle"></i></span>
				</MkA>
			</template>
		</div>
		<div class="sub">
			<button v-click-anime class="_button" @click="help">
				<i class="fas fa-question-circle icon"></i>
				<div class="text">{{ $ts.help }}</div>
			</button>
			<MkA v-click-anime to="/about" @click.passive="close()">
				<i class="fas fa-info-circle icon"></i>
				<div class="text">{{ $ts.instanceInfo }}</div>
			</MkA>
			<MkA v-click-anime to="/about-misskey" @click.passive="close()">
				<img src="/static-assets/favicon.png" class="icon"/>
				<div class="text">{{ $ts.aboutMisskey }}</div>
			</MkA>
		</div>
	</div>
</MkModal>
</template>

<script lang="ts" setup>
import { } from 'vue';
import MkModal from '@/components/ui/modal.vue';
import { menuDef } from '@/menu';
import { instanceName } from '@/config';
import { defaultStore } from '@/store';
import { i18n } from '@/i18n';
import { deviceKind } from '@/scripts/device-kind';
import * as os from '@/os';

const props = withDefaults(defineProps<{
	src?: HTMLElement;
	anchor?: { x: string; y: string; };
}>(), {
	anchor: () => ({ x: 'right', y: 'center' }),
});

const emit = defineEmits<{
	(ev: 'closed'): void;
}>();

const preferedModalType = (deviceKind === 'desktop' && props.src != null) ? 'popup' :
	deviceKind === 'smartphone' ? 'drawer' :
	'dialog';

const modal = $ref<InstanceType<typeof MkModal>>();

const menu = defaultStore.state.menu;

const items = Object.keys(menuDef).filter(k => !menu.includes(k)).map(k => menuDef[k]).filter(def => def.show == null ? true : def.show).map(def => ({
	type: def.to ? 'link' : 'button',
	text: i18n.ts[def.title],
	icon: def.icon,
	to: def.to,
	action: def.action,
	indicate: def.indicated,
}));

function close() {
	modal.close();
}

function help(ev: MouseEvent) {
	os.popupMenu([{
		type: 'link',
		to: '/mfm-cheat-sheet',
		text: i18n.ts._mfm.cheatSheet,
		icon: 'fas fa-code',
	}, {
		type: 'link',
		to: '/scratchpad',
		text: i18n.ts.scratchpad,
		icon: 'fas fa-terminal',
	}, null, {
		text: i18n.ts.document,
		icon: 'fas fa-question-circle',
		action: () => {
			window.open('https://misskey-hub.net/help.html', '_blank');
		},
	}], ev.currentTarget ?? ev.target);

	close();
}
</script>

<style lang="scss" scoped>
.szkkfdyq {
	max-height: 100%;
	width: min(460px, 100vw);
	padding: 24px;
	box-sizing: border-box;
	overflow: auto;
	overscroll-behavior: contain;
	text-align: left;
	border-radius: 16px;

	&.asDrawer {
		width: 100%;
		padding: 16px 16px calc(env(safe-area-inset-bottom, 0px) + 16px) 16px;
		border-radius: 24px;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		text-align: center;
	}

	> .main, > .sub {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

		> * {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			vertical-align: bottom;
			height: 100px;
			border-radius: 10px;

			&:hover {
				color: var(--accent);
				background: var(--accentedBg);
				text-decoration: none;
			}

			> .icon {
				font-size: 24px;
				height: 24px;
			}

			> .text {
				margin-top: 12px;
				font-size: 0.8em;
				line-height: 1.5em;
			}

			> .indicator {
				position: absolute;
				top: 32px;
				left: 32px;
				color: var(--indicator);
				font-size: 8px;
				animation: blink 1s infinite;

				@media (max-width: 500px) {
					top: 16px;
					left: 16px;
				}
			}
		}
	}

	> .sub {
		margin-top: 8px;
		padding-top: 8px;
		border-top: solid 0.5px var(--divider);
	}
}
</style>
