<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-full h-full flex items-center justify-center bg-red-50 dark:bg-gray-600">
  <div class="h-full relative border-gray-800 dark:border-gray-800 md:border-[14px] rounded-[2.5rem] h-full md:h-[800px] w-full md:w-[400px]">
    <div class="absolute h-[18px] w-[148px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 hidden md:inline"></div>
    <div class="absolute h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 -start-[17px] top-[72px] rounded-s-lg hidden md:inline"></div>
    <div class="absolute h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 -start-[17px] top-[124px] rounded-s-lg hidden md:inline"></div>
    <div class="absolute h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 -start-[17px] top-[178px] rounded-s-lg hidden md:inline"></div>
    <div class="absolute h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 -end-[17px] top-[142px] rounded-e-lg hidden md:inline"></div>
    <div class="h-full p-4 md:pt-8 md:rounded-[1.5rem] overflow-auto scrollbar-hide md:w-[373px] md:h-[774px] bg-white dark:bg-red-950">
      <div class="flex flex-col h-full w-full">
        <div class="pb-16 md:pb-0 flex-grow overflow-auto scrollbar-hide">
          <div class="flex flex-col gap-4 p-6">
            {@render children()}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
