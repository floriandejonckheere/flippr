<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  import Form from './Form.svelte';

  import { titleStore } from '$lib/state';

  titleStore.set('Card type');

  let { form, data }: { form: ActionData; data: any } = $props();

  function confirmDelete(e: any) {
    const confirmed = confirm('Are you sure you want to delete this card type? This will also delete all cards with this card type!');

    if (!confirmed) {
      // Prevent the form submission if not confirmed
      e.preventDefault();
    }
  }
</script>

<div
  class="flex h-[12em] w-full items-center justify-center rounded-md p-4 shadow-md"
  style="background-color: {data.cardType.backgroundColor}; color: {data.cardType.textColor};"
>
  {#if data.cardType.image}
    <img
      src={`/uploads/${data.cardType.image}`}
      alt={data.cardType.name}
      class="max-h-[6em] max-w-[10em]"
    />
  {:else}
    <h2>{data.cardType.name}</h2>
  {/if}
</div>

<Form
    form={form}
    data={data.cardType}
/>

<div>
  <form method="POST" action="?/delete" use:enhance>
    <input type="hidden" name="cardTypeId" value={data.cardType.id} />
    <button
        type="submit"
        class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-50 px-4 py-3 text-sm text-red-800 hover:bg-red-100 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 transition-all"
        onclick={confirmDelete}
    >
      Delete card type
    </button>
  </form>
</div>
