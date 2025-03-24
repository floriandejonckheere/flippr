<script lang="ts">
  import QrCodeScanner from '$lib/components/QrCodeScanner.svelte';

  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let {
    form,
    data,
    step,
    stepTo,
  }: {
    form: ActionData,
    data: any,
    step: number,
    stepTo: (step: number) => void,
  } = $props();

  let formData = {
    cardType: '',
    value: '',
  }
</script>

<form method="POST" action="?/create" use:enhance>
  <div class="grid gap-y-4">
    {#if form?.message}
      <p class="text-sm font-bold text-red-600">
        Error: {form.message}
      </p>
    {/if}

    {#if step === 0}
      <div>
        <label for="cardTypeId" class="mb-2 block text-sm dark:text-white"> Type </label>
        <select
            id="cardTypeId"
            name="cardTypeId"
            class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
            onchange={() => stepTo(1)}
            bind:value={formData.cardType}
            required
        >
          <option value="" disabled selected>Select a card</option>
          {#each data.cardTypes as cardType}
            <option value={cardType.id}>{cardType.name}</option>
          {/each}
        </select>
      </div>
    {:else if step === 1}

      <input
          type="hidden"
          id="cardTypeId"
          name="cardTypeId"
          value={formData.cardType}
      />

      <div>
        <button
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-800 px-4 py-3 text-sm font-semibold text-white hover:bg-red-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onclick={() => stepTo(-1)}
        >
          Back
        </button>
      </div>

      <div>
        <QrCodeScanner
            scanSuccess={(e: any) => {
            value = e;
          }}
            scanFailure={(e: any) => {}}
            width={480}
            height={480}
            class="w-full max-w-sm overflow-hidden rounded-lg bg-slate-700"
        />
      </div>

      <div>
        <label for="value" class="mb-2 block text-sm dark:text-white"> Value </label>
        <input
            type="text"
            id="value"
            name="value"
            bind:value={formData.value}
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
    {/if}
  </div>
</form>
