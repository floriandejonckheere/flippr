<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { CreditCard } from '@steeze-ui/heroicons';

  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<div class="text-center">
  <div class="inline-flex items-center gap-x-4 text-2xl font-bold">
    <Icon src={CreditCard} theme="solid" class="h-10 w-10 rounded-full bg-red-800 p-2.5 text-white" />
    Flippr
  </div>
  <p class="mt-2 text-sm text-gray-600">
    Already have an account?
    <a
      href="/auth/signin"
      class="font-medium text-red-800 decoration-2 hover:underline    "
    >
      Sign in here
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
        <label for="email" class="mb-2 block text-sm">
          Email <span class="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50    "
          required
        />
      </div>

      <div>
        <label for="username" class="mb-2 block text-sm">
          Username <span class="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50    "
          required
        />
      </div>

      <div>
        <label for="name" class="mb-2 block text-sm">
          Name <span class="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-sky-700 focus:ring-sky-700 disabled:pointer-events-none disabled:opacity-50    "
          required
        />
      </div>

      <div>
        <label for="password" class="mb-2 block text-sm"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          class="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-red-800 focus:ring-red-800 disabled:pointer-events-none disabled:opacity-50    "
          required
        />
      </div>

      <button
        type="submit"
        class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-800 px-4 py-3 text-sm font-semibold text-white hover:bg-red-900 disabled:pointer-events-none disabled:opacity-50   "
      >
        Sign up
      </button>
    </div>
  </form>
</div>
