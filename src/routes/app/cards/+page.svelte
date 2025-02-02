<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Plus } from '@steeze-ui/heroicons';

  import { titleStore } from '$lib/state';

  titleStore.set('Cards');

  export let data;
</script>

<div class="grid grid-cols-2 gap-2">
  {#each data.cardAndCardTypes as cardAndCardType}
    <a href="/app/cards/{cardAndCardType.card.id}">
      <div
        class="flex h-[6em] w-full items-center justify-center rounded-md p-4 shadow-md"
        style="background-color: {cardAndCardType.cardType.backgroundColor}; color: {cardAndCardType.cardType
          .textColor};"
      >
        {#if cardAndCardType.cardType.image}
          <img
            src={`/static/uploads/${cardAndCardType.cardType.image}`}
            alt={cardAndCardType.cardType.name}
            class="max-h-[4em] max-w-[6em]"
          />
        {:else}
          <h2>{cardAndCardType.cardType.name}</h2>
        {/if}
      </div>
    </a>
  {/each}

  <a href="/app/cards/new">
    <div class="flex h-[6em] w-full items-center justify-center rounded-md bg-red-50 text-red-800">
      <Icon src={Plus} class="h-6 w-6" />
    </div>
  </a>
</div>
