<script lang="ts">
  import { writable } from 'svelte/store';

  import { enhance } from '$app/forms';

  import { titleStore } from '$lib/state';

  import Form from './Form.svelte';

  $titleStore = 'Account';

  let { form, data }: { form: ActionData; data: any } = $props();

  let dataStore = writable({
    id: data.user.id,
    name: data.user.name,
    password: '',
    passwordConfirmation: '',
  });

</script>

<Form
  form={form}
  store={dataStore}
  action="?/update"
/>

<form method="POST" action="?/signout" use:enhance>
  <button
    class="mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-red-50 px-4 py-3 text-sm text-red-800 hover:bg-red-100 disabled:pointer-events-none disabled:opacity-50   transition-all"
  >
    Sign out
  </button>
</form>
