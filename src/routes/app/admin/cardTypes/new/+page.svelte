<script lang="ts">
  import type { ActionData } from './$types';

  import Form from '../Form.svelte';

  import { titleStore } from '$lib/state';

  titleStore.set('New card type');

  let { form }: { form: ActionData } = $props();

  let data = {
    name: 'My Card',
    format: '',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    image: null
  };
</script>

<div
  class="flex h-[12em] w-full items-center justify-center rounded-md p-4 shadow-md"
  style="background-color: {data.backgroundColor}; color: {data.textColor};"
>
  {#if data.image}
    <img
      src={`/uploads/${data.image}`}
      alt={data.name}
      class="max-h-[6em] max-w-[10em]"
    />
  {:else}
    <h2>{data.name}</h2>
  {/if}
</div>

<Form
  form={form}
  data={data}
  action="?/create"
/>