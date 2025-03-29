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
  <button class="w-full rounded-lg bg-red-800 p-4 text-center text-white shadow-md"> Sign out </button>
</form>
