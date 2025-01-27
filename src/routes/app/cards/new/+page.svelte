<script lang="ts">
  import { titleStore } from '$lib/state';

  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form, data }: { form: ActionData; data: any } = $props();

  titleStore.set('New card');
</script>

<form method="POST" use:enhance>
  <div class="grid gap-y-4">
    <p class="text-sm font-bold text-red-600">
      {#if form?.message}
        Error: {form.message}
      {:else}
        &nbsp;
      {/if}
    </p>

    <div>
      <label for="cardTypeId" class="mb-2 block text-sm dark:text-white"> Type </label>
      <select
        id="cardTypeId"
        name="cardTypeId"
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        required
      >
        {#each data.cardTypes as cardType}
          <option value={cardType.id}>{cardType.name}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="name" class="mb-2 block text-sm dark:text-white"> Value </label>
      <input
        type="text"
        id="value"
        name="value"
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        required
      />
    </div>

    <button
      type="submit"
      class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-800 px-4 py-3 text-sm font-semibold text-white hover:bg-red-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Save
    </button>
  </div>
</form>
