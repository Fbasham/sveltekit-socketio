<script>
  import { enhance } from "$app/forms";
  export let form;
</script>

<h1>Sveltekit Chat</h1>
<form method="POST" action="?/joinRoom" use:enhance>
  {#if form?.missing}<p class="error">The name field is required</p>{/if}
  <label>
    Name:
    <input name="name" value={form?.name ?? ""} />
  </label>
  {#if form?.invalid}<p class="error">
      The room field must be a number between 1000 and 9999
    </p>
  {/if}
  <label>
    Room:
    <input
      name="room"
      type="number"
      min="1000"
      max="9999"
      value={form?.room ?? ""}
    />
  </label>
  <button>Join</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    gap: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
  }

  input {
    flex: 1;
  }

  .error {
    color: red;
  }
</style>
