<script lang="ts">
    import {Icon} from '@steeze-ui/svelte-icon'
    import {CreditCard} from '@steeze-ui/heroicons'

    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
</script>

<div class="text-center">
  <div class="inline-flex items-center gap-x-4 text-2xl font-bold dark:text-white">
    <Icon src={CreditCard} theme="solid" class="h-10 w-10 p-2.5 bg-red-800 text-white rounded-full" />
    Flippr
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
    Already have an account?
    <a
        href="/auth/signin"
        class="text-red-800 decoration-2 hover:underline font-medium dark:text-red-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      Sign in here
    </a>
  </p>
</div>

<div class="mt-8">
  <form method="POST" use:enhance>
    <div class="grid gap-y-4">
      <p class="text-sm text-red-600 font-bold">
        {#if form?.message}
          Error: {form.message}
        {:else}
          &nbsp;
        {/if}
      </p>

      <div>
        <label
            for="email"
            class="block text-sm mb-2 dark:text-white"
        >
          Email <span class="text-red-600">*</span>
        </label>
        <input
            type="email"
            id="email"
            name="email"
            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            required
        />
      </div>

      <div>
        <label
            for="username"
            class="block text-sm mb-2 dark:text-white"
        >
          Username <span class="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="username"
            name="username"
            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            required
        />
      </div>

      <div>
        <label
            for="name"
            class="block text-sm mb-2 dark:text-white"
        >
          Name <span class="text-red-600">*</span>
        </label>
        <input
            type="text"
            id="name"
            name="name"
            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-sky-700 focus:ring-sky-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            required
        />
      </div>

      <div>
        <label for="password" class="block text-sm mb-2 dark:text-white">
          Password
        </label>
        <input
            type="password"
            id="password"
            name="password"
            class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-red-800 focus:ring-red-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            required
        />
      </div>

      <button
          type="submit"
          class="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-800 text-white hover:bg-red-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <!--{mutation.isPending ? (-->
<!--            <Spinner color="w-5 h-5 text-white" />-->
<!--        ) : (-->
<!--            'Sign up'-->
<!--        )}-->
        Sign up
      </button>
    </div>
  </form>
</div>
