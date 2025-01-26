<script lang="ts">
  import { enhance } from '$app/forms';

  import type { PageServerData } from './$types';

  import { titleStore } from '$lib/state';
  import Header from '$lib/components/Header.svelte';

  let { data }: { data: PageServerData } = $props();

  titleStore.set('Account');
</script>

<Header user={data?.user} />

<form method="post" use:enhance>
  <button class="w-full rounded-2xl bg-red-800 p-4 text-center text-white shadow-md"> Sign out </button>
</form>
