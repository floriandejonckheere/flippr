<script lang="ts">
  import { writable } from 'svelte/store';

  import type { ActionData } from './$types';

  import Form from '../Form.svelte';

  import { titleStore } from '$lib/state';

  $titleStore = 'New card type';

  let { form }: { form: ActionData } = $props();

  let dataStore = writable({
    name: 'My Card',
    format: '',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    image: null
  });
</script>

<div
  class="flex h-[12em] w-full items-center justify-center rounded-md p-4 shadow-md"
  style="background-color: {$dataStore.backgroundColor}; color: {$dataStore.textColor};"
>
  {#if $dataStore.image}
    <img
      src={`/public/uploads/${$dataStore.id}.webp`}
      alt={$dataStore.name}
      class="max-h-[6em] max-w-[10em]"
    />
  {:else}
    <h2>{$dataStore.name}</h2>
  {/if}
</div>

<Form
  form={form}
  store={dataStore}
  action="?/create"
/>