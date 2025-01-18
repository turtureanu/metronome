<script lang="ts">
	import { settings } from '../stores/metronome';
	import Range from '../components/Range.svelte';
	import Icon from '@iconify/svelte';
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';
	import Drawer from './Drawer.svelte';
	import Toggle from 'svelte-toggle';

	let isDrawerHidden = true;
</script>

<div class="mb-10 mx-auto gap-x-3 flex">
	<Button onclick={() => (isDrawerHidden = false)}>
		<Icon icon="mdi:settings" class="text-xl inline-block" /> | Options</Button
	>
	<Button class="mr-4" onclick={() => goto('/library')}>
		<Icon icon="mdi:music-note" class="text-xl inline-block" /> | Songs
	</Button>
</div>

<Drawer bind:isDrawerHidden>
	<div class="mb-10 px-2">
		<div class="text-3xl font-bold mb-8 text-center">
			{$settings.tempo} BPM
		</div>
		<Range bind:value={$settings.tempo} step={2} max={250} />
	</div>
	<div class="mb-10 px-2">
		<div class="text-3xl font-bold mb-8 text-center">
			{$settings.beats} beats
		</div>
		<Range bind:value={$settings.beats} min={1} max={8} />
	</div>
	<div class="px-2 pb-5">
		<div class="text-3xl font-bold mb-8 text-center">
			{$settings.subdivisions} subdivision{$settings.subdivisions !== 1 ? 's' : ''}
		</div>
		<Range bind:value={$settings.subdivisions} min={1} max={8} />
	</div>
	<div class="px-2 mb-3">
		<p class="text-xl font-bold mb-5">Sound effect</p>
		<div class="flex flex-wrap gap-2">
			<label
				class="{$settings.soundEffect === 'default'
					? 'bg-slate-500'
					: 'bg-slate-700 '} p-2 rounded-xl"
			>
				Default
				<input
					class="hidden"
					type="radio"
					value="default"
					name="sound-effect"
					bind:group={$settings.soundEffect}
				/>
			</label>
			<label
				class="{$settings.soundEffect === 'tom' ? 'bg-slate-500' : 'bg-slate-700 '} p-2 rounded-xl"
			>
				Tom
				<input
					class="hidden"
					type="radio"
					value="tom"
					name="sound-effect"
					bind:group={$settings.soundEffect}
				/>
			</label>
			<label
				class="{$settings.soundEffect === 'hardbass'
					? 'bg-slate-500'
					: 'bg-slate-700 '} p-2 rounded-xl"
			>
				Hardbass
				<input
					class="hidden"
					type="radio"
					value="hardbass"
					name="sound-effect"
					bind:group={$settings.soundEffect}
				/>
			</label>
			<label
				class="{$settings.soundEffect === 'woodblock'
					? 'bg-slate-500'
					: 'bg-slate-700 '} p-2 rounded-xl"
			>
				Woodblock
				<input
					class="hidden"
					type="radio"
					value="woodblock"
					name="sound-effect"
					bind:group={$settings.soundEffect}
				/>
			</label>
			<label
				class="{$settings.soundEffect === 'drums'
					? 'bg-slate-500'
					: 'bg-slate-700 '} p-2 rounded-xl"
			>
				Drums
				<input
					class="hidden"
					type="radio"
					value="drums"
					name="sound-effect"
					bind:group={$settings.soundEffect}
				/>
			</label>
		</div>
	</div>
	<div class="flex justify-between">
		<p class="text-xl font-bold px-3 pt-4">Accent first beat</p>
		<Toggle hideLabel class="scale-125 ml--16 m-auto" bind:toggled={$settings.accentFirst} />
	</div>
</Drawer>
