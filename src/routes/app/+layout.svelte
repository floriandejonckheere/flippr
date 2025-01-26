<script lang="ts">
  import '../../app.css';

  import type { PageServerData } from '../$types';

  import { titleStore } from '$lib/state';
  import Header from '$lib/components/Header.svelte';

  let { children, data }: { children(): any; data: PageServerData } = $props();

  titleStore.set('Flippr');
</script>

<Header user={data?.user} />

{@render children()}
