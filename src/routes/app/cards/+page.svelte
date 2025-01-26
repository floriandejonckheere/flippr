<script lang="ts">
  import { titleStore } from '$lib/state';

  titleStore.set('Cards');

  export let data;
</script>

<div class="grid grid-cols-2 gap-2">
  {#each data.cardAndCardTypes as cardAndCardType}
    <a href="/app/cards/{cardAndCardType.card.id}">
      <div
        class="flex h-[6em] w-full items-center justify-center rounded-md shadow-md"
        style="background-color: {cardAndCardType.cardType.backgroundColor}; color: {cardAndCardType.cardType.textColor};"
      >
        <h2>{cardAndCardType.cardType.name}</h2>
      </div>
    </a>
  {/each}
</div>
