<template>
<MkStickyContainer>
	<template #header><MkPageHeader/></template>
	<div class="mwysmxbg">
		<div>{{ $ts._mfm.intro }}</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.mention }}</div>
			<div class="content">
				<p>{{ $ts._mfm.mentionDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_mention"/>
					<MkTextarea v-model="preview_mention"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.hashtag }}</div>
			<div class="content">
				<p>{{ $ts._mfm.hashtagDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_hashtag"/>
					<MkTextarea v-model="preview_hashtag"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.url }}</div>
			<div class="content">
				<p>{{ $ts._mfm.urlDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_url"/>
					<MkTextarea v-model="preview_url"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.link }}</div>
			<div class="content">
				<p>{{ $ts._mfm.linkDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_link"/>
					<MkTextarea v-model="preview_link"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.emoji }}</div>
			<div class="content">
				<p>{{ $ts._mfm.emojiDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_emoji"/>
					<MkTextarea v-model="preview_emoji"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.bold }}</div>
			<div class="content">
				<p>{{ $ts._mfm.boldDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_bold"/>
					<MkTextarea v-model="preview_bold"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.small }}</div>
			<div class="content">
				<p>{{ $ts._mfm.smallDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_small"/>
					<MkTextarea v-model="preview_small"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.quote }}</div>
			<div class="content">
				<p>{{ $ts._mfm.quoteDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_quote"/>
					<MkTextarea v-model="preview_quote"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.center }}</div>
			<div class="content">
				<p>{{ $ts._mfm.centerDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_center"/>
					<MkTextarea v-model="preview_center"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.inlineCode }}</div>
			<div class="content">
				<p>{{ $ts._mfm.inlineCodeDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_inlineCode"/>
					<MkTextarea v-model="preview_inlineCode"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.blockCode }}</div>
			<div class="content">
				<p>{{ $ts._mfm.blockCodeDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_blockCode"/>
					<MkTextarea v-model="preview_blockCode"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.inlineMath }}</div>
			<div class="content">
				<p>{{ $ts._mfm.inlineMathDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_inlineMath"/>
					<MkTextarea v-model="preview_inlineMath"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<!-- deprecated
	<div class="section _block">
		<div class="title">{{ $ts._mfm.search }}</div>
		<div class="content">
			<p>{{ $ts._mfm.searchDescription }}</p>
			<div class="preview">
				<Mfm :text="preview_search"/>
				<MkTextarea v-model="preview_search"><template #label>MFM</template></MkTextarea>
			</div>
		</div>
	</div>
	-->
		<div class="section _block">
			<div class="title">{{ $ts._mfm.flip }}</div>
			<div class="content">
				<p>{{ $ts._mfm.flipDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_flip"/>
					<MkTextarea v-model="preview_flip"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.font }}</div>
			<div class="content">
				<p>{{ $ts._mfm.fontDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_font"/>
					<MkTextarea v-model="preview_font"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.x2 }}</div>
			<div class="content">
				<p>{{ $ts._mfm.x2Description }}</p>
				<div class="preview">
					<Mfm :text="preview_x2"/>
					<MkTextarea v-model="preview_x2"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.x3 }}</div>
			<div class="content">
				<p>{{ $ts._mfm.x3Description }}</p>
				<div class="preview">
					<Mfm :text="preview_x3"/>
					<MkTextarea v-model="preview_x3"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.x4 }}</div>
			<div class="content">
				<p>{{ $ts._mfm.x4Description }}</p>
				<div class="preview">
					<Mfm :text="preview_x4"/>
					<MkTextarea v-model="preview_x4"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.blur }}</div>
			<div class="content">
				<p>{{ $ts._mfm.blurDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_blur"/>
					<MkTextarea v-model="preview_blur"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.jelly }}</div>
			<div class="content">
				<p>{{ $ts._mfm.jellyDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_jelly"/>
					<MkTextarea v-model="preview_jelly"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.tada }}</div>
			<div class="content">
				<p>{{ $ts._mfm.tadaDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_tada"/>
					<MkTextarea v-model="preview_tada"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.jump }}</div>
			<div class="content">
				<p>{{ $ts._mfm.jumpDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_jump"/>
					<MkTextarea v-model="preview_jump"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.bounce }}</div>
			<div class="content">
				<p>{{ $ts._mfm.bounceDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_bounce"/>
					<MkTextarea v-model="preview_bounce"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.spin }}</div>
			<div class="content">
				<p>{{ $ts._mfm.spinDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_spin"/>
					<MkTextarea v-model="preview_spin"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.shake }}</div>
			<div class="content">
				<p>{{ $ts._mfm.shakeDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_shake"/>
					<MkTextarea v-model="preview_shake"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.twitch }}</div>
			<div class="content">
				<p>{{ $ts._mfm.twitchDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_twitch"/>
					<MkTextarea v-model="preview_twitch"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.rainbow }}</div>
			<div class="content">
				<p>{{ $ts._mfm.rainbowDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_rainbow"/>
					<MkTextarea v-model="preview_rainbow"><template #label>MFM</template></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.sparkle }}</div>
			<div class="content">
				<p>{{ $ts._mfm.sparkleDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_sparkle"/>
					<MkTextarea v-model="preview_sparkle"><span>MFM</span></MkTextarea>
				</div>
			</div>
		</div>
		<div class="section _block">
			<div class="title">{{ $ts._mfm.rotate }}</div>
			<div class="content">
				<p>{{ $ts._mfm.rotateDescription }}</p>
				<div class="preview">
					<Mfm :text="preview_rotate"/>
					<MkTextarea v-model="preview_rotate"><span>MFM</span></MkTextarea>
				</div>
			</div>
		</div>
	</div>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import MkTextarea from '@/components/form/textarea.vue';
import { definePageMetadata } from '@/scripts/page-metadata';
import { i18n } from '@/i18n';
import { instance } from '@/instance';

const preview_mention = '@example';
const preview_hashtag = '#test';
const preview_url = 'https://example.com';
const preview_link = `[${i18n.ts._mfm.dummy}](https://example.com)`;
const preview_emoji = instance.emojis.length ? `:${instance.emojis[0].name}:` : ':emojiname:';
const preview_bold = `**${i18n.ts._mfm.dummy}**`;
const preview_small = `<small>${i18n.ts._mfm.dummy}</small>`;
const preview_center = `<center>${i18n.ts._mfm.dummy}</center>`;
const preview_inlineCode = '`<: "Hello, world!"`';
const preview_blockCode = '```\n~ (#i, 100) {\n\t<: ? ((i % 15) = 0) "FizzBuzz"\n\t\t.? ((i % 3) = 0) "Fizz"\n\t\t.? ((i % 5) = 0) "Buzz"\n\t\t. i\n}\n```';
const preview_inlineMath = '\\(x= \\frac{-b\' \\pm \\sqrt{(b\')^2-ac}}{a}\\)';
const preview_quote = `> ${i18n.ts._mfm.dummy}`;
const preview_search = `${i18n.ts._mfm.dummy} 検索`;
const preview_jelly = '$[jelly 🍮] $[jelly.speed=5s 🍮]';
const preview_tada = '$[tada 🍮] $[tada.speed=5s 🍮]';
const preview_jump = '$[jump 🍮] $[jump.speed=5s 🍮]';
const preview_bounce = '$[bounce 🍮] $[bounce.speed=5s 🍮]';
const preview_shake = '$[shake 🍮] $[shake.speed=5s 🍮]';
const preview_twitch = '$[twitch 🍮] $[twitch.speed=5s 🍮]';
const preview_spin = '$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]\n$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]\n$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]\n\n$[spin.speed=5s 🍮]';
const preview_flip = `$[flip ${i18n.ts._mfm.dummy}]\n$[flip.v ${i18n.ts._mfm.dummy}]\n$[flip.h,v ${i18n.ts._mfm.dummy}]`;
const preview_font = `$[font.serif ${i18n.ts._mfm.dummy}]\n$[font.monospace ${i18n.ts._mfm.dummy}]\n$[font.cursive ${i18n.ts._mfm.dummy}]\n$[font.fantasy ${i18n.ts._mfm.dummy}]`;
const preview_x2 = '$[x2 🍮]';
const preview_x3 = '$[x3 🍮]';
const preview_x4 = '$[x4 🍮]';
const preview_blur = `$[blur ${i18n.ts._mfm.dummy}]`;
const preview_rainbow = '$[rainbow 🍮] $[rainbow.speed=5s 🍮]';
const preview_sparkle = '$[sparkle 🍮]';
const preview_rotate = '$[rotate 🍮]';

definePageMetadata({
	title: i18n.ts._mfm.cheatSheet,
	icon: 'fas fa-question-circle',
});
</script>

<style lang="scss" scoped>
.mwysmxbg {
	background: var(--bg);

	> .section {
		> .title {
			position: sticky;
			z-index: 1;
			top: var(--stickyTop, 0px);
			padding: 16px;
			font-weight: bold;
			-webkit-backdrop-filter: var(--blur, blur(10px));
			backdrop-filter: var(--blur, blur(10px));
			background-color: var(--X16);
		}

		> .content {
			> p {
				margin: 0;
				padding: 16px;
			}

			> .preview {
				border-top: solid 0.5px var(--divider);
				padding: 16px;
			}
		}
	}
}
</style>
