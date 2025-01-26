<script lang="ts">
  import { titleStore } from '$lib/state';

  titleStore.set('Card');

  export let data;
</script>

<div
  class="space-between flex h-[20em] w-full flex-col items-center justify-between rounded-md p-3"
  style="background-color: {data.cardAndCardType.cardType.backgroundColor}; color: {data.cardAndCardType.cardType
    .textColor};"
>
  <div class="flex h-1/3 items-center text-2xl">
    {data.cardAndCardType.cardType.name}
  </div>

  <div class="flex h-2/3 w-full items-center justify-center rounded-md bg-white p-4 text-black">
    <div class="text-lg">
      {data.cardAndCardType.card.value}
    </div>
  </div>
</div>
