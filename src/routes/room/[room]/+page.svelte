<script>
  import { page } from "$app/stores";
  import { io } from "socket.io-client";

  let room = $page.params.room;
  let name = $page.url.searchParams.get("name");
  let chat = [];
  let socket = io();

  function handleSubmit(e) {
    let message = e.target.chat.value;
    socket.emit("message-from-client", { room, name, message });
    e.target.chat.value = "";
  }

  socket.on("connect", () => {
    socket.emit("join-room", room);
  });

  socket.on("update-from-server", (messages) => {
    chat = messages;
  });
</script>

<h1>Room {room}</h1>

<div class="chat-container">
  <div class="chat-box">
    {#each chat as { sender, name, message }}
      <div class:right={sender === socket.id}>
        <p class="sender">{name}</p>
        <p>
          {message}
        </p>
      </div>
    {/each}
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <input name="chat" placeholder="enter a message" />
  </form>
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .chat-container {
    display: flex;
    flex-direction: column;
    background-color: rgb(228, 228, 228);
    max-width: 500px;
    min-height: 400px;
    border: 1px solid black;
  }
  .chat-box {
    flex: 1;
    word-break: break-all;
  }
  .right {
    text-align: right;
  }
  .sender {
    font-size: 0.8em;
    font-weight: bold;
  }
  form {
    width: 100%;
  }
  input {
    width: 100%;
  }
</style>
