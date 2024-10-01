import dbConnect from "@/lib/connectdb/connection";
import Diagrams from "@/lib/models/Diagrams";
import mongoose from "mongoose";

export async function DELETE(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the diagram ID from the dynamic route [id]
    const { id } = params;

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: "Invalid diagram ID" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Delete the diagram by its ID
    const deletedDiagram = await Diagrams.findByIdAndDelete(id);

    // If no diagram is found, return a 404 response
    if (!deletedDiagram) {
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

    // Return a success response with the deleted diagram
    return new Response(
      JSON.stringify({
        message: "Diagram deleted successfully",
        diagram: deletedDiagram,
      }),
      {
        status: 200, // Success status
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
