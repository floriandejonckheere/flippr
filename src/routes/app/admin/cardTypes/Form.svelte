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
      <label for="name" class="mb-2 block text-sm dark:text-white"> Name </label>
      <input
        type="text"
        id="name"
        name="name"
        bind:value={$store.name}
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        required
      />
    </div>

    <div>
      <label for="format" class="mb-2 block text-sm dark:text-white"> Format </label>
      <select
        id="format"
        name="format"
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        bind:value={$store.format}
        required
      >
        <option value="" disabled selected>Select a format</option>

        <option value="UPC">UPC</option>
        <option value="CODE39">CODE39</option>
        <option value="CODE128">CODE128</option>
        <option value="EAN2">EAN-2</option>
        <option value="EAN5">EAN-5</option>
        <option value="EAN8">EAN-8</option>
        <option value="EAN13">EAN-13</option>
        <option value="ITF14">ITF-14</option>
        <option value="MSI">MSI</option>
        <option value="MSI10">MSI10</option>
        <option value="MSI11">MSI11</option>
        <option value="MSI1010">MSI1010</option>
        <option value="MSI1110">MSI1110</option>
        <option value="pharmacode">Pharmacode</option>
        <option value="codabar">Codabar</option>
      </select>
    </div>

    <div>
      <label for="name" class="mb-2 block text-sm dark:text-white"> Background color </label>
      <input
        type="text"
        id="backgroundColor"
        name="backgroundColor"
        bind:value={$store.backgroundColor}
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        required
      />
    </div>

    <div>
      <label for="name" class="mb-2 block text-sm dark:text-white"> Text color </label>
      <input
        type="text"
        id="textColor"
        name="textColor"
        bind:value={$store.textColor}
        class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
        required
      />
    </div>

    <div>
      <label for="image"> Image </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg, image/svg+xml"
        class="block w-full text-sm text-slate-500 my-3 file:rounded-lg file:border file:border-transparent file:bg-red-50 file:cursor-pointer file:mr-4 file:px-4 file:py-3 file:text-sm file:text-red-800 file:hover:bg-red-100 file:disabled:pointer-events-none file:disabled:opacity-50 file:dark:focus:outline-none file:dark:focus:ring-1 file:dark:focus:ring-gray-600"
        required
      />
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, or JPG (max. 800x400px)</p>
    </div>

    <button
        type="submit"
        class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-800 px-4 py-3 text-sm font-semibold text-white hover:bg-red-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Save
    </button>
  </div>
</form>
