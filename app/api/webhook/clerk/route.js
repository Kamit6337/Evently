import { Webhook } from "svix";
import { headers } from "next/headers";
import { createUser, deleteUser, updateUser } from "@lib/actions/user";
import environment from "@utils/environment";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = environment.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
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

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log("Webhook body:", body);

    // MARK: CREATE NEW USER IN DATABASE WHEN USER LOGGED IN
    if (eventType === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;

      const userObj = {
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        photo: image_url,
      };

      const newUser = await createUser(userObj);

      // MARK: MAKE CLERT SESSION (TOKEN) BY PUTTING NEW USER _ID INTO CLERK CLIENT
      console.log("newUser", newUser);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json({ message: "OK", user: newUser });
    }

    // MARK: UPDATE USER WHEN USER MAKES ANY CHANGES
    if (eventType === "user.updated") {
      const { id, image_url, first_name, last_name } = evt.data;

      const user = {
        firstName: first_name,
        lastName: last_name,
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: "OK", user: updatedUser });
    }

    // MARK: DELETE USER WHEN HE WANTED
    if (eventType === "user.deleted") {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id);

      return NextResponse.json({ message: "OK", user: deletedUser });
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.log("Error in clerk login", error);
    throw new Error("Error in clerk login", error);
  }
}
