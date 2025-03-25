<script lang="ts">
  import '../app.css';

  let { children }: { children: () => any } = $props();
</script>

<div class="flex h-full w-full items-center justify-center bg-red-50">
  <div
    class="relative h-full w-full rounded-[2.5rem] border-gray-800 md:h-[800px] md:w-[400px] md:border-[14px]"
  >
    <div
      class="absolute left-1/2 top-0 hidden h-[18px] w-[148px] -translate-x-1/2 rounded-b-[1rem] bg-gray-800 md:inline z-10"
    ></div>
    <div
      class="absolute -start-[17px] top-[72px] hidden h-[32px] w-[3px] rounded-s-lg bg-gray-800 md:inline z-10"
    ></div>
    <div
      class="absolute -start-[17px] top-[124px] hidden h-[46px] w-[3px] rounded-s-lg bg-gray-800 md:inline z-10"
    ></div>
    <div
      class="absolute -start-[17px] top-[178px] hidden h-[46px] w-[3px] rounded-s-lg bg-gray-800 md:inline z-10"
    ></div>
    <div
      class="absolute -end-[17px] top-[142px] hidden h-[64px] w-[3px] rounded-e-lg bg-gray-800 md:inline z-10"
    ></div>
    <div
      class="scrollbar-hide h-full overflow-auto bg-white md:h-[774px] md:w-[373px] md:rounded-[1.5rem] md:pt-8"
    >
      <div class="flex h-full w-full flex-col">
        {@render children()}
      </div>
    </div>
  </div>
</div>
