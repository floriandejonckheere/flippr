<script lang="ts">
  import { enhance } from '$app/forms';

  import { titleStore } from '$lib/state';

  $titleStore = 'Account';
</script>

<form method="post" use:enhance>
  <button class="w-full rounded-lg bg-red-800 p-4 text-center text-white shadow-md"> Sign out </button>
</form>
