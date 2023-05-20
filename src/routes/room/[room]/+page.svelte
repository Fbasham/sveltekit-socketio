<script>
  import { page } from "$app/stores";
  import { io } from "socket.io-client";
  import { onMount, tick } from "svelte";

  let room = $page.params.room;
  let name = $page.url.searchParams.get("name");
  let chat = [];
  let socket = io();
  let chatBox;

  onMount(() => scrollToBottom(chatBox));

  const scrollToBottom = async (node) => {
    if (node) node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  function handleSubmit(e) {
    let message = e.target.chat.value;
    socket.emit("message-from-client", { room, name, message });
    e.target.chat.value = "";
  }

  socket.on("connect", () => {
    socket.emit("join-room", room);
  });

  socket.on("update-from-server", async (messages) => {
    chat = messages;
    await tick();
    scrollToBottom(chatBox);
  });
</script>

<h1>Room {room}</h1>

<div class="chat-container">
  <div bind:this={chatBox} class="chat-box">
    {#each chat as { sender, name, message }}
      <div class:right={sender === socket.id}>
        <p class="sender">{name}</p>
        <p class="message">
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
    max-width: 400px;
    height: 400px;
    border: 1px solid black;
  }
  .chat-box {
    flex: 1;
    word-break: break-all;
    overflow: auto;
  }
  .right {
    text-align: right;
  }
  .sender {
    font-size: 0.8em;
    font-weight: bold;
  }
  .message {
    margin-bottom: 5px;
  }
  form {
    width: 100%;
  }
  input {
    width: 100%;
  }
</style>
