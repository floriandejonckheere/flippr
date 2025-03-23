<script lang="ts">
  import { enhance } from '$app/forms';

  import type { PageServerData } from './$types';

  import { titleStore } from '$lib/state';

  titleStore.set('Administration');
</script>

<a href="/app/admin/users">
  <div class="w-full rounded-lg bg-red-800 p-4 text-center text-white shadow-md">
    Manage users
  </div>
</a>

<a href="/app/admin/cardTypes">
  <div class="w-full rounded-lg bg-red-800 p-4 text-center text-white shadow-md">
    Manage card types
  </div>
</a>
