<script lang="ts">
	import { settings } from '../stores/metronome';
	import Range from '../components/Range.svelte';
	import Icon from '@iconify/svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import Button from './Button.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

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
{#if isDrawerHidden}{:else}
	<div
		transition:slide={{ duration: 200, easing: quintOut, axis: 'y' }}
		class="w-[100vw] max-w-2xl px-10 pb-10 pt-5 rounded-tr-3xl rounded-tl-3xl bg-gradient-to-tr bg-gradient-from-gray-800 bg-gradient-to-slate-800 position-fixed bottom-0"
	>
		<div class="flex justify-end">
			<button onclick={() => (isDrawerHidden = true)}>
				<Icon class="text-4xl" icon="mdi:close" />
			</button>
		</div>
		<div class="mb-10">
			<div class="text-3xl font-bold mb-8 text-center">
				{$settings.tempo} BPM
			</div>
			<Range bind:value={$settings.tempo} step={2} max={200} />
		</div>
		<div>
			<div class="text-3xl font-bold mb-8 text-center">
				{$settings.beats} beats
			</div>
			<Range bind:value={$settings.beats} min={1} max={8} />
		</div>
	</div>
{/if}
