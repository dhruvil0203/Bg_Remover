import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// IMPORTANT: To make webhook verification work, you need to get the raw request body.
// If you are using Express, you should use this middleware *before* your webhook handler route:
//
// app.post('/api/webhooks/clerk', express.raw({type: 'application/json'}), clerkWebHooks);
//
// Do NOT use express.json() for the webhook route, as it will parse the body and
// prevent the svix.verify function from working.

const clerkWebHooks = async (req, res) => {
  try {
    // Check if the 'svix-id' header is present
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Error: Missing Svix headers",
      });
    }

    // Get the raw body from the request
    const payload = req.body;

    // Create a new Svix instance with your secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Get the data and event type from the verified payload
    const { data, type } = evt;

    console.log(`Webhook received: ${type}`);

    switch (type) {
      case "user.created": {
        // FIX: The email address is in `data.email_addresses[0].email_address` (singular)
        const userData = {
          clerkID: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.create(userData);
        console.log("User created in DB:", userData.clerkID);
        break;
      }
      case "user.updated": {
        // FIX: The email address is in `data.email_addresses[0].email_address` (singular)
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkID: data.id }, userData);
        console.log("User updated in DB:", data.id);
        break;
      }
      case "user.deleted": {
        // For user.deleted, the payload might not contain the full user object.
        // The `data.id` is the most important part.
        if (data.id) {
          await userModel.findOneAndDelete({ clerkID: data.id });
          console.log("User deleted from DB:", data.id);
        }
        break;
      }
      default:
        // It's good practice to log unhandled event types
        console.log(`Unhandled event type: ${type}`);
        break;
    }

    // Send a 200 OK response to acknowledge receipt of the webhook
    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    // Catch any other unexpected errors
    console.error("Error processing webhook:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebHooks };
