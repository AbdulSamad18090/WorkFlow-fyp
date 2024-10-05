"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaSearch } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import { fetchData } from "next-auth/client/_utils";
import { ImSpinner3 } from "react-icons/im";

export default function Home() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [isfetchingProject, setIsfetchingProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedProjects, setGroupedProjects] = useState({});
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null); // Hold project to delete
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const fetchProjects = async () => {
    setIsfetchingProject(true);
    console.log(session?.user?.userData?.id);
    if (session?.user?.userData?.id) {
      try {
        const res = await axios.get(
          `/api/diagram/get/${session.user?.userData?.id}`
        );
        const projects = res?.data?.diagrams;

        // Grouping projects by type
        const grouped = projects.reduce((acc, project) => {
          const type = project.type;
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(project);
          return acc;
        }, {});

        setGroupedProjects(grouped);
        setIsfetchingProject(false);
      } catch (error) {
        console.error(error);
        setIsfetchingProject(false);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [session?.user?.userData?.id]);

  const handleEdit = (type, id) => {
    const formattedType = type.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${formattedType}/edit/${id}`);
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const res = await axios.delete(`/api/diagram/delete/${id}`);
      setProjectToDelete(null); // Reset the project after deletion
      setIsDeleteDialog(false);
      setIsDeleteDialog(false);
      fetchProjects();
    } catch (error) {
      console.log("Error =>", error);
      setIsDeleteDialog(false);
    }
  };



  const navigateToEditor = (type) => {
    const editorPath = type.split(" ").join("").toLowerCase();
    router.push(`/edit/${editorPath}`);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Head>
        <title>WorFlow</title>
        <meta
          name="description"
          content="Create and visualize diagrams with ease"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 overflow-hidden z-0">
        <svg
          className="absolute inset-0 w-full h-full text-blue-500"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
          <circle cx="150" cy="150" r="50" fill="currentColor" opacity="0.1" />
          <circle cx="100" cy="100" r="30" fill="currentColor" opacity="0.1" />
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.1"
          />
          <line
            x1="0"
            y1="200"
            x2="200"
            y2="0"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.1"
          />
          <rect
            x="20"
            y="120"
            width="40"
            height="40"
            fill="currentColor"
            opacity="0.1"
          />
          <rect
            x="140"
            y="20"
            width="50"
            height="50"
            fill="currentColor"
            opacity="0.1"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-5xl font-semibold mb-12 text-gray-800">
          Design Your Project Work Flow
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div
            onClick={() => router.push("/flow-diagram")}
            className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <svg
              className="w-24 h-24 mb-4 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10h5M3 14h5M3 6h5m10 8h5m-5-4h5M13 6h5m-5 8h5m-5-4V6m0 12v-6" />
            </svg>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">
              Flow Diagram
            </h2>
            <p className="text-gray-600">
              Visualize the flow of processes and decisions with ease.
            </p>
          </div>

          <div
            onClick={() => router.push("/sequence-diagram")}
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <svg
              className="w-24 h-24 mb-4 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16M4 19h16m-6-7h6M4 9h6M14 13h2M14 7h2M4 13h2" />
            </svg>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">
              Sequence Diagram
            </h2>
            <p className="text-gray-600">
              Depict the sequence of interactions and messages between entities.
            </p>
          </div>

          <div
            onClick={() => router.push("/hierarchy-diagram")}
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <svg
              className="w-24 h-24 mb-4 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l4 4m0 0l4 4m-4-4v12m0 0l-4-4m0 0l-4 4m4-12H5m7 0h7" />
            </svg>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">
              Hierarchy Diagram
            </h2>
            <p className="text-gray-600">
              Show the structure of organizations or systems.
            </p>
          </div>

          <div
            onClick={() => router.push("/process-diagram")}
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center text-center cursor-pointer"
          >
            <svg
              className="w-24 h-24 mb-4 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16v5H4zM4 10h7v5H4zm9 0h7v5h-7zm-9 5h7v5H4zm9 0h7v5h-7z" />
            </svg>
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">
              Process Diagram
            </h2>
            <p className="text-gray-600">
              Map out the steps of a process from start to finish efficiently.
            </p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
            <h2 className="text-4xl font-bold text-gray-800">Your Projects</h2>
            <div className="flex items-center gap-2 border border-blue-500 px-2 py-2 rounded-lg shadow-md">
              <input
                type="search"
                placeholder="Type your project name..."
                className="w-[300px] outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <FaSearch className="text-blue-500" />
            </div>
          </div>

          {/* Loop through grouped projects by type */}
          {isfetchingProject ? (
            <div className="w-full flex justify-center">
              <ImSpinner3 className="text-4xl animate-spin" />
            </div>
          ) : Object.keys(groupedProjects).length === 0 ? (
            <p className="text-center text-lg">No Projects</p>
          ) : (
            Object.keys(groupedProjects).map((type) => (
              <div key={type} className="mb-8">
                <div className="w-full flex justify-start">
                  <h3 className="text-base bg-blue-500 hover:bg-blue-600 transition-all w-fit text-white rounded-br-3xl pl-2 pr-6 py-1 mb-4">
                    {type}s
                  </h3>
                </div>
                <div className="space-y-4">
                  {groupedProjects[type]
                    .filter((project) =>
                      project.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((project) => (
                      <div
                        key={project.id}
                        className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg  hover:translate-x-10 transition-all flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800">
                            {project.name}
                          </h3>
                        </div>
                        <div className="flex space-x-4">
                          <button
                            onClick={() =>
                              handleEdit(project?.type, project?._id)
                            }
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setIsDeleteDialog(true); // Set dialog open
                              setProjectToDelete(project._id); // Set project to delete
                            }}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

        {isDeleteDialog && (
          <div className="fixed top-20 w-full h-fit z-50 flex justify-center">
            <div className="bg-white w-[400px] h-fit p-4 rounded-lg shadow-lg border">
              <div className="flex items-center gap-4">
                <GoAlert className="text-4xl text-yellow-500" />
                <div>
                  <h1 className="text-lg font-semibold">Are you sure!</h1>
                  <p className="my-1 text-sm">Do you want to delete?</p>
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <button
                  className="bg-gray-100 border border-gray-300 hover:bg-gray-200 px-6 transition-all rounded"
                  onClick={() => {
                    setIsDeleteDialog(false); // Close the dialog
                  }}
                >
                  No
                </button>
                <button
                  className="bg-blue-500 border border-gray-300 hover:bg-blue-600 text-white px-6 transition-all rounded"
                  onClick={() => {
                    handleDelete(projectToDelete); // Call delete with project ID
                  }}
                >
                  {isDeleting ? "Deleting..." : "yes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
