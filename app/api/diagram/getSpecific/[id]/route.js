import dbConnect from "@/lib/connectdb/connection";
import Diagrams from "@/lib/models/Diagrams";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid diagram ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Fetch the diagram by its _id
    const diagram = await Diagrams.findById(id);

    // If no diagram is found, return a 404 response
    if (!diagram) {
      return new Response(
        JSON.stringify({ error: "Diagram not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Return the retrieved diagram
    return new Response(
      JSON.stringify({
        message: "Diagram retrieved successfully",
        diagram,
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
