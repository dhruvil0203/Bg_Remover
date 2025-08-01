import { Webhook } from "svix";
import userModel from "../models/userModel.js";

export const clerkWebHooks = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is not set in environment variables.");
    return res.status(500).send("Server configuration error.");
  }

  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).send("Error: Missing required Svix headers.");
  }

  const body = req.body;
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err.message);
    return res.status(400).send("Error: Webhook verification failed.");
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
      return res.status(500).send("Error saving user to database.");
    }
  }

  return res.status(200).send("Webhook processed successfully.");
};
