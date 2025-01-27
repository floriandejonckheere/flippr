<script lang="ts">
  import { enhance } from '$app/forms';

  import type { PageServerData } from './$types';

  import { titleStore } from '$lib/state';

  titleStore.set('Administration');
</script>

Admin
