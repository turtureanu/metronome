<script lang="ts">
	import PlayStop from '../components/PlayStop.svelte';
	import ManualConfig from '../components/ManualConfig.svelte';
	import { settings, songLibrary } from '../stores/metronome';

	let selectedSong = $songLibrary.filter((e) => e.selected === true)[0];

	if (selectedSong !== undefined) {
		$settings.tempo = selectedSong.tempo;
		$settings.beats = selectedSong.beats;
		$settings.subdivisions = selectedSong.subdivisions;
	}
</script>

<div class="w-full h-full m-auto flex flex-col justify-between">
	{#key $settings}
		{#if selectedSong !== undefined}
			{#if $settings.tempo === selectedSong.tempo && $settings.beats === selectedSong.beats && $settings.subdivisions === selectedSong.subdivisions && $settings.accentFirst === selectedSong.accentFirst}
				<div class="bg-slate-800 mx-auto mt-8 p-3 rounded-lg w-fit">
					Selected song: {selectedSong.title}
				</div>
			{/if}
		{/if}
	{/key}
	<PlayStop />
	<ManualConfig />
</div>
