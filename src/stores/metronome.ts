import { persisted } from 'svelte-persisted-store';

export const settings = persisted('settings', {
	tempo: 120,
	beats: 4,
	subdivisions: 1,
	accentFirst: true
});

export interface Song {
	id: number;
	title: string;
	artist?: string;
	tempo: number;
	beats: number;
	subdivisions: number;
}

export const songLibrary = persisted<Song[]>('songs', []);

export const editing = persisted('editing', {
	id: -1,
	isBeingEdited: false
});
