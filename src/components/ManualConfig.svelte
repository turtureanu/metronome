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

<div class="mb-10 mx-auto">
	<Button class="mr-4" onclick={() => goto('/library')}>
		<Icon icon="mdi:music-note" class="text-xl inline-block" /> | Songs
	</Button>
	<Button onclick={() => (isDrawerHidden = false)}>
		<Icon icon="mdi:settings" class="text-xl inline-block" /> | Options</Button
	>
</div>

<Drawer bind:isDrawerHidden>
	<div class="mb-10 px-2">
		<div class="text-3xl font-bold mb-8 text-center">
			{$settings.tempo} BPM
		</div>
		<Range bind:value={$settings.tempo} step={2} max={200} />
	</div>
	<div class="mb-10 px-2">
		<div class="text-3xl font-bold mb-8 text-center">
			{$settings.beats} beats
		</div>
		<Range bind:value={$settings.beats} min={1} max={8} />
	</div>
	<div class="px-2">
		<div class="text-3xl font-bold mb-8 text-center">
			{$settings.subdivisions} subdivision{$settings.subdivisions !== 1 ? 's' : ''}
		</div>
		<Range bind:value={$settings.subdivisions} min={1} max={8} />
	</div>
	<div class="flex justify-between">
		<p class="text-xl font-bold px-3 py-4">Accent first sound</p>
		<Toggle hideLabel class="scale-125 ml--16 m-auto" bind:toggled={$settings.accentFirst} />
	</div>
</Drawer>
