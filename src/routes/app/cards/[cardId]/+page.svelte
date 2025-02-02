<script lang="ts">
  import Barcode from 'svelte-barcode';

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
    {#if data.cardAndCardType.cardType.image}
      <img
        src={`/uploads/${data.cardAndCardType.cardType.image}`}
        alt={data.cardAndCardType.cardType.name}
        class="max-h-[2em] max-w-[3em]"
      />
    {:else}
      <h2>{data.cardAndCardType.cardType.name}</h2>
    {/if}
  </div>

  <div class="flex h-2/3 w-full items-center justify-center rounded-md bg-white p-4 text-black">
    <Barcode
      value={data.cardAndCardType.card.value}
      elementTag={'svg'}
      options={{
        format: data.cardAndCardType.cardType.format,
        width: 2,
        height: 100,
        margin: 0,
        text: '',
        textAlign: 'center',
        textPosition: 'bottom',
        textMargin: 4,
        fontSize: 20,
        background: '#ffffff',
        lineColor: '#000000'
      }}
    />
  </div>
</div>
