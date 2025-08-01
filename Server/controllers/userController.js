import { Webhook } from "svix";
import { headers } from "next/headers";
import userModel from "../models/userModel";

export const clerkWebhookHandler = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const newUser = {
      clerkID: id,
      email: email_addresses[0].email_address,
      photo: image_url,
      firstName: first_name,
      lastName: last_name,
    };

    try {
      await userModel.create(newUser);
    } catch (error) {
      console.error("Error creating user in MongoDB:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
};
