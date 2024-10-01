import mongoose from "mongoose";

const DiagramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  diagram: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Flow Diagram",
      "Sequence Diagram",
      "Hierarchy Diagram",
      "Process Diagram",
    ],
    required: [true, "Type of diagram is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

// Use the model only if it hasn't been compiled yet
export default mongoose.models.Diagram ||
  mongoose.model("Diagram", DiagramSchema);
