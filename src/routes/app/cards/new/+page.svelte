<script lang="ts">
  import type { ActionData } from './$types';

  import Form from './Form.svelte';

  import { titleStore } from '$lib/state';

  titleStore.set('New card');

  let { form, data }: { form: ActionData; data: any } = $props();

  let active: number = $state(0);

  const stepTo = (step: number) => {
    active += step
  }
</script>

<Form
    form={form}
    data={data}
    step={active}
    stepTo={stepTo}
/>
