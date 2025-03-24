<script lang="ts">
  import { titleStore } from '$lib/state';
  import {Plus} from "@steeze-ui/heroicons";
  import {Icon} from "@steeze-ui/svelte-icon";

  titleStore.set('Card types');

  export let data;
</script>

<div class="flex flex-col gap-4">
  {#each data.cardTypes as cardType}
    <a href="/app/admin/cardTypes/{cardType.id}" class="flex items-center gap-3">
      <div>
        <div
            class="flex h-[2em] w-[3em] items-center justify-center rounded-md shadow-sm"
            style="background-color: {cardType.backgroundColor}; color: {cardType.textColor};"
        >
          {#if cardType.image}
            <img
                src={`/uploads/${cardType.image}`}
                alt={cardType.name}
                class="max-h-[1em] max-w-[2em]"
            />
          {/if}
        </div>
      </div>
      <div>
        {cardType.name}
      </div>
    </a>
    <hr class="border-gray-200" />
  {/each}

  <a href="/app/admin/cardTypes/new" class="flex items-center gap-3">
    <div>
      <div
          class="flex h-[2em] w-[3em] items-center justify-center rounded-md bg-red-50 text-red-800"
      >
        <Icon src={Plus} class="h-4 w-4" />
      </div>
    </div>
    <div>
      Create a card type
    </div>
  </a>
</div>
