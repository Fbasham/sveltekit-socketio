import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SocketServer } from "./socketServer";

export default defineConfig({
  plugins: [sveltekit(), SocketServer],
});
