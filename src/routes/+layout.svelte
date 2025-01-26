<script lang="ts">
  import '../app.css';

  import Header from '$lib/components/Header.svelte';
  import { titleStore } from '$lib/state';

  import type { PageServerData } from './$types';

  let { children, data }: { children(): any; data: PageServerData } = $props();

  console.log('Hello from layout page');

  titleStore.set('Flippr');
</script>

<div class="flex h-full w-full items-center justify-center bg-red-50 dark:bg-gray-600">
  <div
    class="relative h-full w-full rounded-[2.5rem] border-gray-800 md:h-[800px] md:w-[400px] md:border-[14px] dark:border-gray-800"
  >
    <div
      class="absolute left-1/2 top-0 hidden h-[18px] w-[148px] -translate-x-1/2 rounded-b-[1rem] bg-gray-800 md:inline"
    ></div>
    <div
      class="absolute -start-[17px] top-[72px] hidden h-[32px] w-[3px] rounded-s-lg bg-gray-800 md:inline dark:bg-gray-800"
    ></div>
    <div
      class="absolute -start-[17px] top-[124px] hidden h-[46px] w-[3px] rounded-s-lg bg-gray-800 md:inline dark:bg-gray-800"
    ></div>
    <div
      class="absolute -start-[17px] top-[178px] hidden h-[46px] w-[3px] rounded-s-lg bg-gray-800 md:inline dark:bg-gray-800"
    ></div>
    <div
      class="absolute -end-[17px] top-[142px] hidden h-[64px] w-[3px] rounded-e-lg bg-gray-800 md:inline dark:bg-gray-800"
    ></div>
    <div
      class="scrollbar-hide h-full overflow-auto bg-white p-4 md:h-[774px] md:w-[373px] md:rounded-[1.5rem] md:pt-8 dark:bg-red-950"
    >
      <div class="flex h-full w-full flex-col">
        <div class="scrollbar-hide flex-grow overflow-auto pb-16 md:pb-0">
          <div class="flex flex-col gap-4 p-6">
            <Header user={data?.user} />

            {@render children()}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
