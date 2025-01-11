<script lang="ts">
	import { settings } from '../stores/metronome';
	import { Sound } from 'svelte-sound';

	import nonAccentedSoundEffect from '../assets/sounds/default/down.mp3';
	import accentedSoundEffect from '../assets/sounds/default/up.mp3';

	const getBeats = () => {
		let arr = [];
		for (let i = 1; i <= $settings.beats; i++) {
			arr.push(i);
		}
		return arr;
	};

	let accented = $state(1);

	const nonAccentedSound = new Sound(nonAccentedSoundEffect);
	const accentedSound = new Sound(accentedSoundEffect);

	let isPaused = $state(true);

	$effect(() => {
		let interval: number;
		let sub = 1;
		const beats = $settings.beats;
		const tempo = $settings.tempo;
		const subdivisions = $settings.subdivisions;
		if (!isPaused && $settings.tempo !== 0) {
			interval = setInterval(
				() => {
					if (subdivisions === 1 || (sub % subdivisions) - 1 === 0) {
						if (accented < beats) {
							accented++;
							nonAccentedSound.play();
						} else {
							sub = 1;
							accented = 1;
							$settings.accentFirst ? accentedSound.play() : nonAccentedSound.play();
						}
					} else {
						nonAccentedSound.play();
					}

					sub++;
				},
				(60 * 1000) / tempo / subdivisions
			);
		}

		return () => {
			sub = 1;
			accented = 1;
			clearInterval(interval);
		};
	});

	let dotSize = $state(50);
	let dotGap = $state(30);
</script>

<!-- max-width: 600px -->
<!-- gap: 20px -->
<!-- if gap * (dotCount - 1) * dotSize <= max-width -->
<button class="btn w-full h-full block" onclick={() => (isPaused = !isPaused)}>
	<div class="flex flex-col items-center justify-center">
		<div
			class={`flex flex-wrap justify-center`}
			style={`gap: ${dotGap}px;${'max-width: ' + ($settings.beats === 5 ? '' : $settings.beats === 6 ? dotGap * 2 + dotSize * 3 : dotGap * 3 + dotSize * 4) + 'px;'}`}
		>
			{#each getBeats() as beat}
				<div
					class={`rounded-full ${beat === accented ? 'bg-sky-400' : 'bg-sky-200'}`}
					style={`width: ${dotSize}px; height: ${dotSize}px;`}
				></div>
			{/each}
		</div>
		<div class="pt-8 text-xl">
			{#if !isPaused}
				playing
			{:else}
				paused
			{/if}
		</div>
	</div>
</button>
