<script lang="ts">
  import { titleStore } from '$lib/state';

  $titleStore = 'Administration';
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
