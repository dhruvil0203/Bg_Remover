import { Webhook } from "svix";
import userModel from "../models/userModel.js";

export const clerkWebHooks = async (req, res) => {
  console.log("--- WEBHOOK ENDPOINT HIT ---"); // Log 1: Did the request even reach here?

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CRITICAL: CLERK_WEBHOOK_SECRET is not set!");
    return res.status(500).send("Server configuration error.");
  }

  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing Svix headers", { headers: req.headers });
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
    console.log("--- WEBHOOK VERIFIED SUCCESSFULLY ---"); // Log 2: Did verification pass?
  } catch (err) {
    console.error("Error verifying webhook:", err.message);
    return res.status(400).send("Error: Webhook verification failed.");
  }

  const eventType = evt.type;
  console.log(`Received event type: ${eventType}`); // Log 3: What event is Clerk sending?

  if (eventType === "user.created") {
    console.log('--- HANDLING "user.created" EVENT ---'); // Log 4: Are we handling the correct event?
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const newUser = {
      clerkID: id,
      email: email_addresses[0].email_address,
      photo: image_url,
      firstName: first_name,
      lastName: last_name,
    };

    console.log("Attempting to create user with data:", newUser); // Log 5: Is the data correct?

    try {
      await userModel.create(newUser);
      console.log("--- SUCCESS: USER CREATED IN MONGODB ---"); // Log 6: Did it save?
    } catch (error) {
      console.error("--- FAILURE: ERROR CREATING USER IN MONGODB ---", error);
      return res.status(500).send("Error saving user to database.");
    }
  } else {
    console.log(`Skipping event type: ${eventType}`);
  }

  return res.status(200).send("Webhook processed.");
};
