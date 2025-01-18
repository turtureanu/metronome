<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';

	let {
		value = $bindable(),
		min = 0,
		max = 100,
		step = 1
	}: { value: number; min?: number; max?: number; step?: number } = $props();
</script>

<RangeSlider
	bind:value
	{min}
	{max}
	{step}
	pips
	pipstep={step}
	last="label"
	first="label"
	rest="pip"
/>

<style>
	:root {
		--range-handle-focus: #4090f0 !important;
	}
</style>
