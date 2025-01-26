<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowLeft } from '@steeze-ui/heroicons';

  import { titleStore } from '$lib/state';

  const { user, back = undefined } = $props();
</script>

<div class="flex items-center gap-4 text-red-800">
  {#if back}
    <a href={back}>
      <Icon src={ArrowLeft} theme="solid" class="h-8 w-8 " />
    </a>
  {/if}

  <div class="flex flex-col gap-2">
    <div class="text-sm">
      Welcome {user?.name}
    </div>
    <h1 class="inline-block text-2xl font-semibold">
      {$titleStore}
    </h1>
  </div>

  <div class="flex-1"></div>

  <div class="float-right">
    <a href="/auth/account">
      <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-800 font-semibold text-white">
        {user?.name?.charAt(0)?.toUpperCase()}
      </span>
    </a>
  </div>
</div>
