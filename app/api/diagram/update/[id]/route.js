import dbConnect from "@/lib/connectdb/connection";
import Diagrams from "@/lib/models/Diagrams";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse the request body
    const { name, diagram, type } = await request.json();
    
    // Get the diagram ID from the dynamic route [id]
    const { id } = params;

    // Validate the input
    if (!name || !diagram || !type) {
      return new Response(
        JSON.stringify({ error: "Please fill all required fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

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

    // Update the diagram by its ID and return the updated document
    const updatedDiagram = await Diagrams.findByIdAndUpdate(
      id, // ID of the diagram to update
      { name, diagram, type }, // Fields to update
      { new: true, runValidators: true } // Return the updated document and validate the fields
    );

    // If no diagram is found, return a 404 response
    if (!updatedDiagram) {
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

    // Return the updated diagram
    return new Response(
      JSON.stringify({
        message: "Diagram updated successfully",
        diagram: updatedDiagram,
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
