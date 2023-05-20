import { fail, redirect } from "@sveltejs/kit";

function generateRandomRoom() {
  return ((Math.random() * 8999) | 0) + 1000;
}

export const actions = {
  joinRoom: async (event) => {
    let data = await event.request.formData();
    let name = data.get("name")?.trim();
    let room = data.get("room") || generateRandomRoom();

    if (!name) return fail(400, { name, missing: true });
    if (!/^\d{4}$/.test(room)) return fail(400, { room, invalid: true });

    throw redirect(307, `/room/${room}?name=${name}`);
  },
};
