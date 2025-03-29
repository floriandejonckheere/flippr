<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form, store, action }: { form: ActionData, store: any, action: string } = $props();
</script>

<form method="POST" action={action} enctype="multipart/form-data" use:enhance>
  <div class="grid gap-y-4">
    {#if form?.message}
      <p class="text-sm font-bold text-red-600">
        Error: {form.message}
      </p>
    {/if}

    <div>
      <label for="name" class="mb-2 block text-sm"> Name </label>
      <input
        type="text"
        id="name"
        name="name"
        bind:value={$store.name}
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50"
        required
      />
    </div>

    <div>
      <label for="password" class="mb-2 block text-sm"> Password </label>
      <input
        type="password"
        id="password"
        name="password"
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50"
        required
      />
    </div>


    <div>
      <label for="passwordConfirmation" class="mb-2 block text-sm"> Repeat password </label>
      <input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50"
        required
      />
    </div>

    <button
      type="submit"
      class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-800 px-4 py-3 text-sm font-semibold text-white hover:bg-red-900 disabled:pointer-events-none disabled:opacity-50"
    >
      Save
    </button>
  </div>
</form>
