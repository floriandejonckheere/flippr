<script lang="ts">
  import type { PageServerData } from '../$types';

  import { titleStore } from '$lib/state';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children, data }: { children(): any; data: PageServerData } = $props();

  titleStore.set('Flippr');
</script>

<div class="scrollbar-hide flex-grow overflow-auto pb-16 md:pb-0">
  <div class="flex flex-col gap-16 p-8">
    <Header user={data?.user} />

    {@render children()}
  </div>
</div>

<Footer user={data?.user} />
