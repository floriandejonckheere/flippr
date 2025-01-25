<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { CreditCard } from '@steeze-ui/heroicons';

  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<div class="text-center">
  <div class="inline-flex items-center gap-x-4 text-2xl font-bold dark:text-white">
    <Icon src={CreditCard} theme="solid" class="h-10 w-10 rounded-full bg-red-800 p-2.5 text-white" />
    Flippr
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
    Don't have an account yet?
    <a
      href="/auth/signup"
      class="font-medium text-red-800 decoration-2 hover:underline dark:text-red-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Sign up here
    </a>
  </p>
</div>

<div class="mt-8">
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
        <label for="username" class="mb-2 block text-sm dark:text-white"> Username </label>
        <input
          type="text"
          id="username"
          name="username"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-red-800 focus:ring-red-800 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
          required
        />
      </div>

      <div>
        <label for="password" class="mb-2 block text-sm dark:text-white"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-red-800 focus:ring-red-800 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-800 px-4 py-3 text-sm font-semibold text-white hover:bg-red-900 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        Sign in
      </button>
    </div>
  </form>
</div>
