import dbConnect from "@/lib/connectdb/connection";
import Diagrams from "@/lib/models/Diagrams";

// POST: Create or Update a Diagram
export async function POST(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, diagram, type, diagramId } = await request.json();
    console.log("id =>", diagramId)

    // Get the user ID from the dynamic route [id]
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

    // If a diagramId is provided, update the existing diagram
    if (diagramId) {
      const existingDiagram = await Diagrams.findById(diagramId);

      if (!existingDiagram) {
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

      existingDiagram.name = name;
      existingDiagram.diagram = diagram;
      existingDiagram.type = type;
      await existingDiagram.save();

      return new Response(
        JSON.stringify({
          message: "Diagram updated successfully",
          diagram: existingDiagram,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // Create a new diagram document
      const newDiagram = new Diagrams({
        name,
        diagram,
        type,
        user: id, // The user ID from the dynamic route
      });

      // Save the diagram to the database
      await newDiagram.save();

      // Return a success response
      return new Response(
        JSON.stringify({
          message: "Diagram created successfully",
          diagram: newDiagram,
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error(error);

    // Return a detailed error response
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
