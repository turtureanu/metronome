<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	let {
		isDrawerHidden = $bindable(true),
		class: className,
		children,
		...props
	}: { isDrawerHidden?: boolean; class?: string; children: Snippet; [key: string]: any } = $props();
</script>

{#if !isDrawerHidden}
	<div
		class="w-[100vw] max-w-2xl px-10 pb-8 pt-5 rounded-tr-3xl rounded-tl-3xl bg-gradient-to-tr bg-gradient-from-gray-800 bg-gradient-to-slate-800 position-fixed bottom-0"
		transition:slide={{ duration: 200, easing: quintOut, axis: 'y' }}
	>
		<div class="flex justify-end">
			<button onclick={() => (isDrawerHidden = true)}>
				<Icon class="text-4xl" icon="mdi:close" />
			</button>
		</div>
		<div class="scroll rounded-2xl overflow-y-scroll {className}" {...props}>
			<div>
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.scroll::-webkit-scrollbar {
		width: 2px !important;
		background-color: transparent;
	}

	.scroll::-webkit-scrollbar-thumb {
		width: 2px !important;
		background-color: #808080;
	}
</style>
