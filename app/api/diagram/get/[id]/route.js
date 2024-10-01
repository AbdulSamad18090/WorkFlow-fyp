import dbConnect from "@/lib/connectdb/connection";
import Diagrams from "@/lib/models/Diagrams";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid user ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Fetch diagrams for the user with the given id
    const diagrams = await Diagrams.find({ user: id });

    // Return the retrieved diagrams
    return new Response(
      JSON.stringify({
        message: "Diagrams retrieved successfully",
        diagrams,
      }),
      {
        status: 200, // Status code for a successful GET request
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    // Return an error response with a proper message
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
