<script lang="ts">
  import { page } from '$app/state';

  import { Icon } from '@steeze-ui/svelte-icon';
  import { CreditCard, UserCircle, Cog6Tooth } from '@steeze-ui/heroicons';

  const { user } = $props();
</script>

<div class="fixed bottom-0 w-full bg-red-50 md:relative">
  <nav class="flex flex-row justify-center font-bold text-white">
    <a
      href="/app/cards"
      class="flex w-full flex-col items-center gap-2 p-4 text-sm {page.url.pathname.startsWith('/app/cards')
        ? 'bg-red-800 text-white'
        : 'bg-transparent text-red-800'}"
    >
      <Icon src={CreditCard} theme="solid" class="h-4 w-4" />
      Cards
    </a>
    <a
      href="/app/settings"
      class="flex w-full flex-col items-center gap-2 p-4 text-sm {page.url.pathname.startsWith('/app/settings')
        ? 'bg-red-800 text-white'
        : 'bg-transparent text-red-800'}"
    >
      <Icon src={UserCircle} theme="solid" class="h-4 w-4" />
      Account
    </a>
    {#if user?.admin}
      <a
        href="/app/admin"
        class="flex w-full flex-col items-center gap-2 p-4 text-sm {page.url.pathname.startsWith('/app/admin')
          ? 'bg-red-800 text-white'
          : 'bg-transparent text-red-800'}"
      >
        <Icon src={Cog6Tooth} theme="solid" class="h-4 w-4" />
        Administration
      </a>
    {/if}
  </nav>
</div>
