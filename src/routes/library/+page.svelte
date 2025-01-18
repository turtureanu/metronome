<script lang="ts">
	import Icon from '@iconify/svelte';
	import { settings, songLibrary, editing, type Song } from '../../stores/metronome';
	import Button from '../../components/Button.svelte';
	import Range from '../../components/Range.svelte';
	import Toggle from 'svelte-toggle';
	import { fade, slide } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import { goto } from '$app/navigation';
	let isDrawerHidden = $state(true);

	let songTitle: string = $state('');
	let songArtist: string = $state('');
	let songTempo: number = $state($settings.tempo);
	let songBeats: number = $state($settings.beats);
	let songSubdivisions: number = $state($settings.subdivisions);
	let songAccentFirst: boolean = $state($settings.accentFirst);

	const resetForm = () => {
		songTitle = '';
		songArtist = '';
		songTempo = $settings.tempo;
		songBeats = $settings.beats;
		songSubdivisions = $settings.subdivisions;
		songAccentFirst = true;
	};

	const handleCancel = () => {
		isDrawerHidden = true;
		resetForm();
	};

	const handleEdit = (id: Song['id']) => {
		$editing.id = id;
		$editing.isBeingEdited = true;

		let { title, artist, tempo, beats, subdivisions, accentFirst } = $songLibrary.filter(
			(song) => song.id === id
		)[0];

		resetForm();

		songTitle = title;
		songArtist = artist ? artist : 'N/A';
		songTempo = tempo;
		songBeats = beats;
		songSubdivisions = subdivisions;
		songAccentFirst = accentFirst;

		isDrawerHidden = false;
		console.log(isDrawerHidden);
	};

	const handleAdd = (e: any) => {
		e.preventDefault();
		// @ts-ignore
		songLibrary.update((songs) => {
			if ($editing.isBeingEdited) {
				const editedSong = songs.filter((e) => e.id === $editing.id)[0];

				editedSong.title = songTitle;
				editedSong.artist = songArtist;
				editedSong.tempo = songTempo;
				editedSong.beats = songBeats;
				editedSong.subdivisions = songSubdivisions;
				editedSong.accentFirst = songAccentFirst;
				$editing.isBeingEdited = false;
				$editing.id = -1;
			} else {
				songs.push({
					id: songs.length > 0 ? songs.slice(-1)[0].id + 1 : 0,
					title: songTitle,
					artist: songArtist ? songArtist : 'N/A',
					tempo: songTempo,
					beats: songBeats,
					subdivisions: songSubdivisions,
					accentFirst: songAccentFirst
				});
			}

			return songs;
		});

		resetForm();
		$editing.isBeingEdited = false;
		isDrawerHidden = true;
	};

	const handleDelete = (id: number) => {
		$songLibrary = $songLibrary.filter((song) => song.id !== id);
	};

	const checkedSongs = $state($songLibrary.map((_) => false));
</script>

{#snippet topNavbar()}
	<a class="decoration-none h-20" href="/">
		<div class="flex items-center text-3xl px-4 py-9">
			<Icon class="mr-3" icon="mdi:chevron-left" />
			<h1>Custom songs</h1>
		</div>
	</a>
{/snippet}

{#snippet addSong()}
	<Button onclick={() => (isDrawerHidden = false)} class="flex items-center gap-x-2"
		><Icon class="text-2xl ml--2" icon="mdi:plus" /> Add song</Button
	>
{/snippet}

<div class="h-full">
	{#key $songLibrary}
		{#if $songLibrary.length && isDrawerHidden}
			<div in:fade={{ duration: 150 }}>
				{@render topNavbar()}
				<div class="pb-16">
					{#each $songLibrary as song, index}
						<div class="flex">
							<div
								class="w-full song mb-2 mt-2 flex pl-1 py-1 justify-between items-center text-xl mx-4 bg-slate-800 rounded-lg"
							>
								<input
									class="hidden"
									type="checkbox"
									name={`check-${song.id}`}
									id={`check-${song.id}`}
									bind:checked={checkedSongs[$songLibrary.indexOf(song)]}
								/>
								<label
									class="w-full py-3 cursor-pointer flex items-center justify-between"
									for={`check-${song.id}`}
								>
									<div class="flex items-center justify-start">
										<Icon class="mx-2 text-2xl" icon="material-symbols:music-note" />
										<div class="max-w-64 text-nowrap overflow-hidden text-ellipsis">
											{song.title}
										</div>
									</div>

									<Icon
										class="text-2xl mr-3 {checkedSongs[$songLibrary.indexOf(song)]
											? 'rotate-90'
											: ''} transition-transform ease-in-out"
										icon="mdi:chevron-right"
									/>
								</label>
							</div>
							<button
								class={`${$songLibrary[$songLibrary.indexOf(song)].selected === true ? 'bg-emerald-700' : 'bg-gray-700'} px-4 mr-4 my-2 rounded-lg text-nowrap text-lg`}
								onclick={() => {
									$songLibrary.forEach((s, i) => i !== index && (s.selected = false));
									if (song.selected) {
										$songLibrary[$songLibrary.indexOf(song)].selected = false;
									} else {
										$songLibrary[$songLibrary.indexOf(song)].selected = true;
									}

									goto('/');
								}}>Use</button
							>
						</div>

						{#if checkedSongs[$songLibrary.indexOf(song)]}
							<div
								class="mx-4 my-2 px-4 bg-gray-800 rounded-lg"
								transition:slide={{ duration: 100, easing: linear }}
							>
								{#if song.artist !== 'N/A'}
									<p class="px-3 pt-3 italic">
										{song.artist}
									</p>
								{/if}
								<div class="flex justify-between p-3">
									<p>
										<span class="font-bold">BPM:</span>
										{song.tempo}
									</p>
									<p>
										<span class="font-bold">Beats:</span>
										{song.beats}
									</p>
									<p>
										<span class="font-bold">Subdivision{song.subdivisions > 1 ? 's' : ''}:</span>
										{song.subdivisions}
									</p>
								</div>
								<div class="flex justify-end p-2 pb-3">
									<button
										class="block pl-4 pr-5 py-3 rounded-lg mr-2 font-bold bg-red-900 flex items-center gap-x-2"
										onclick={() => handleDelete(song.id)}
									>
										<Icon icon="mdi:trash" />
										Delete
									</button>
									<button
										class="block rounded-lg font-bold pl-4 pr-5 py-3 bg-gray-700 flex items-center gap-x-2"
										onclick={() => handleEdit(song.id)}
									>
										<Icon icon="mdi:pencil" />
										Edit
									</button>
								</div>
							</div>
						{/if}
					{/each}
				</div>
				<div class="left-0 fixed bottom-12 flex justify-center w-full">
					{@render addSong()}
				</div>
			</div>
		{:else if isDrawerHidden}
			<div in:fade={{ duration: 150 }} class="flex flex-col justify-between h-full">
				{@render topNavbar()}
				<div class="h-full flex items-center justify-center">
					{@render addSong()}
				</div>
			</div>
		{/if}
	{/key}

	{#if isDrawerHidden === false}
		<div in:fade={{ duration: 150 }}>
			<div class="flex flex-col p-5 h-[100vh] justify-between bg-slate-800">
				<form method="POST" onsubmit={handleAdd}>
					<div class="flex justify-between mb-4">
						<button
							onclick={() => {
								isDrawerHidden = true;
								handleCancel();
							}}
						>
							<Icon class="text-4xl" icon="mdi:close" />
						</button>
						<input class="text-2xl px-2 py-4 my-2" type="submit" value="Save" />
					</div>
					<div class="text-xl">
						<input
							class="focus:outline-none active:outline-none border-none block w-full my-4 bg-slate-600 p-3 rounded-lg"
							placeholder="name"
							type="text"
							name="song-name"
							id="song-name"
							bind:value={songTitle}
							required
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
					<div class="mt-10 px-2">
						<div class="mb-15">
							<div class="text-3xl font-bold mb-8 text-center">
								{songTempo} BPM
							</div>
							<Range bind:value={songTempo} step={2} max={250} />
						</div>
						<div class="mb-15">
							<div class="text-3xl font-bold mb-8 text-center">
								{songBeats} beats
							</div>
							<Range bind:value={songBeats} min={1} max={8} />
						</div>
						<div>
							<div class="text-3xl font-bold mb-8 text-center">
								{songSubdivisions} subdivision{$settings.subdivisions !== 1 ? 's' : ''}
							</div>
							<Range bind:value={songSubdivisions} min={1} max={8} />
						</div>
					</div>
					<div class="flex justify-between mt-15">
						<p class="text-xl font-bold px-3 py-4">Accent first beat</p>
						<Toggle hideLabel class="scale-125 ml--16 m-auto" bind:toggled={songAccentFirst} />
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
