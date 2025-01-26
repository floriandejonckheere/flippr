<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  import { titleStore } from '$lib/state';

  let { data }: { data: PageServerData } = $props();

  titleStore.set('Account');
</script>

<form method="post" use:enhance>
  <button
    class="w-full p-4 bg-red-800 rounded-2xl shadow-md text-center text-white"
  >
    Sign out
  </button>
</form>
