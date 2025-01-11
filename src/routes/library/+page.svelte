<script lang="ts">
	import Icon from '@iconify/svelte';
	import { settings, songLibrary, editing, type Song } from '../../stores/metronome';
	import Button from '../../components/Button.svelte';
	import Range from '../../components/Range.svelte';
	import Drawer from '../../components/Drawer.svelte';
	import Toggle from 'svelte-toggle';
	let isDrawerHidden = true;

	let songTitle: string;
	let songArtist: string;
	let songTempo: number = $settings.tempo;
	let songBeats: number = $settings.beats;
	let songSubdivisions: number = $settings.subdivisions;

	const resetForm = () => {
		songTitle = '';
		songArtist = '';
		songTempo = $settings.tempo;
		songBeats = $settings.beats;
		songSubdivisions = $settings.subdivisions;
	};

	const handleCancel = () => {
		isDrawerHidden = true;
		resetForm();
	};

	const handleEdit = (id: Song['id']) => {
		$editing.id = id;
		$editing.isBeingEdited = true;

		let { title, artist, tempo, beats, subdivisions } = $songLibrary.filter(
			(song) => song.id === id
		)[0];

		resetForm();

		songTitle = title;
		songArtist = artist ? artist : 'N/A';
		songTempo = tempo;
		songBeats = beats;
		songSubdivisions = subdivisions;

		isDrawerHidden = false;
	};

	const handleAdd = () => {
		// @ts-ignore
		songLibrary.update((songs) => {
			if ($editing.isBeingEdited) {
				const editedSong = songs.filter((e) => e.id === $editing.id)[0];

				editedSong.title = songTitle;
				editedSong.artist = songArtist;
				editedSong.tempo = songTempo;
				editedSong.beats = songBeats;
				editedSong.subdivisions = songSubdivisions;
				$editing.isBeingEdited = false;
				$editing.id = -1;
			} else {
				songs.push({
					id: songs.length > 0 ? songs.slice(-1)[0].id + 1 : 0,
					title: songTitle,
					artist: songArtist ? songArtist : 'N/A',
					tempo: songTempo,
					beats: songBeats,
					subdivisions: songSubdivisions
				});
			}

			return songs;
		});

		resetForm();
		isDrawerHidden = true;
	};

	const handleDelete = (id: number) => {
		$songLibrary = $songLibrary.filter((song) => song.id !== id);
	};
</script>

<div class="h-full">
	<a class="decoration-none h-20" href="/">
		<div class="flex items-center text-3xl p-4">
			<Icon class="mr-3" icon="mdi:chevron-left" />
			<h1>Songs</h1>
		</div>
	</a>
	{#key $songLibrary}
		{#if $songLibrary.length}
			{#each $songLibrary as song}
				<div
					class="mb-4 flex pl-1 justify-between items-center text-xl mx-4 bg-gray-600 rounded-lg"
				>
					<button class="w-full">
						<div class="flex items-center justify-start">
							<Icon class="mx-2 text-2xl" icon="mdi:chevron-right" />
							{song.title}
						</div>
					</button>
					<div class="flex">
						<button class="px-1 py-2" onclick={() => handleEdit(song.id)}>
							<Icon class="text-2xl m-2" icon="mdi:pencil" />
						</button>
						<button class="px-1 py-2" onclick={() => handleDelete(song.id)}>
							<Icon class="text-2xl m-2" icon="mdi:trash" />
						</button>
					</div>
				</div>
			{/each}
			<Button onclick={() => (isDrawerHidden = false)}>Add song</Button>
		{:else}
			<div class="h-full mt--20 flex justify-center items-center">
				<Button onclick={() => (isDrawerHidden = false)}>Add song</Button>
			</div>
		{/if}
	{/key}
	<Drawer bind:isDrawerHidden class="max-h-64">
		<div class="text-xl">
			<input
				class="focus:outline-none active:outline-none border-none block w-full my-4 bg-slate-600 p-3 rounded-lg"
				placeholder="name"
				type="text"
				name="song-name"
				id="song-name"
				bind:value={songTitle}
			/>
			<input
				class="focus:outline-none active:outline-none outline-none border-none block w-full my-4 bg-slate-600 p-3 rounded-lg"
				placeholder="author"
				type="text"
				name="song-author"
				id="song-author"
				bind:value={songArtist}
			/>
		</div>
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
		<div class="flex justify-evenly">
			<Button onclick={handleCancel}>Cancel</Button>
			<Button onclick={handleAdd}>Add</Button>
		</div>
	</Drawer>
</div>
