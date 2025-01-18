<script lang="ts">
	let { children }: { children: any } = $props();
	import { page } from '$app/state';

	import 'uno.css';
	import '@unocss/reset/tailwind.css';

	import '../styles/global.css';
</script>

<div class="h-full text-white bg-black">
	{#key page.url}
		<div id="currentPage" class="h-full max-w-2xl m-auto">
			{@render children()}
		</div>
	{/key}
</div>

<style>
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	#currentPage {
		animation: fadeIn 250ms ease-in;
	}
</style>
