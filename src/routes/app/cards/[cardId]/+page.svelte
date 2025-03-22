<script lang="ts">
  import { enhance } from '$app/forms';

  import Barcode from 'svelte-barcode';

  import { titleStore } from '$lib/state';

  titleStore.set('Card');

  function confirmDelete(e: any) {
    const confirmed = confirm('Are you sure you want to delete this card?');

    if (!confirmed) {
      // Prevent the form submission if not confirmed
      e.preventDefault();
    }
  }

  let fullscreen = false;

  export let data;
</script>

{#if fullscreen}
  <div
    class="absolute inset-0 top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden md:h-[774px] md:w-[373px] md:rounded-[1.5rem] bg-white z-2"
    onclick={() => { fullscreen = false }}
  >
    <div class="relative w-full h-full p-8">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="transform rotate-90 origin-center">
          <div class="max-w-full max-h-full">
            <Barcode
              value={data.cardAndCardType.card.value}
              elementTag={'svg'}
              options={{
                format: data.cardAndCardType.cardType.format,
                width: 4,
                height: 200,
                margin: 0,
                text: '',
                textAlign: 'center',
                textPosition: 'bottom',
                textMargin: 4,
                fontSize: 20,
                background: '#ffffff',
                lineColor: '#000000',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
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

    <div
        class="flex h-2/3 w-full items-center justify-center rounded-md bg-white p-4 text-black"
        onclick={() => { fullscreen = true }}
    >
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

  <div>
    <form method="POST" action="?/delete" use:enhance>
      <input type="hidden" name="cardId" value={data.cardAndCardType.card.id} />
      <button
          type="submit"
          class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-50 px-4 py-3 text-sm text-red-800 hover:bg-red-100 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 transition-all"
          onclick={confirmDelete}
      >
        Delete card
      </button>
    </form>
  </div>
{/if}
