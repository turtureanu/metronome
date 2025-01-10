<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		class: className,
		children,
		...props
	}: { class?: string; children: Snippet; [key: string]: any } = $props();
</script>

<button class="bg-slate-800 text-xl py-3 px-6 min-w-32 rounded-lg {className}" {...props}>
	{@render children()}
</button>
