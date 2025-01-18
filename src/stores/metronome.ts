import { persisted } from 'svelte-persisted-store';

export const settings = persisted('settings', {
	tempo: 120,
	beats: 4,
	subdivisions: 1,
	accentFirst: true,
	soundEffect: 'default'
});

export interface Song {
	id: number;
	title: string;
	artist?: string;
	tempo: number;
	beats: number;
	subdivisions: number;
	accentFirst: boolean;
	selected?: boolean;
}

export const songLibrary = persisted<Song[]>('songs', []);

export const editing = persisted('editing', {
	id: -1,
	isBeingEdited: false
});
