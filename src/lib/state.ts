import { writable } from 'svelte/store';

const titleStore = writable('Svelte app');

export { titleStore };
