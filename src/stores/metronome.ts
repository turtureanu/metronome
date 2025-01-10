import { persisted } from 'svelte-persisted-store';

export const settings = persisted('settings', {
	tempo: 120,
	beats: 4,
	subdivision: 4,
	accentFirst: true
});

interface SongsCollection {
	songs: {
		id: number;
		name: string;
		artist: string;
	}[];
}

export const songLibrary = persisted<SongsCollection>('songs', {
	songs: []
});
