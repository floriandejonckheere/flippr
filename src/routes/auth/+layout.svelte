<script lang="ts">
  let { children }: { children(): any } = $props();
</script>

<div class="scrollbar-hide flex-grow overflow-auto pb-16 md:pb-0">
  <div class="flex flex-col gap-16 p-8">
    {@render children()}
  </div>
</div>
