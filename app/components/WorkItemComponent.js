import React, { useState, useEffect } from "react";
import Link from "next/link";

const WorkItemComponent = ({
  mode,
  data = {},
  onSaveSuccess,
  onAddAnother,
}) => {
  // Initialize local state directly without conditional checks
  const [localData, setLocalData] = useState({
    referenceType: "",
    status: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    // On component mount or data change, reset localData only if in "edit" mode
    if (mode === "edit" && data.referenceType && data.status) {
      setLocalData({
        referenceType: data.referenceType,
        status: data.status,
      });
    }
  }, [data, mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle saving the work item
  const handleSave = async () => {
    try {
      const response = await fetch("/api/workitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localData),
      });

      if (!response.ok) {
        throw new Error("Failed to save work item");
      }

      // Assuming the save is successful
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving work item:", error);
      // Optionally, handle error scenarios here
    }
  };

  // Simplified for clarity
  const isSaveEnabled = localData.referenceType && localData.status;

  const handleAddAnother = () => {
    setLocalData({
      referenceType: "",
      status: "",
    });
    setShowSuccessModal(false);
    if (onAddAnother) onAddAnother(); // Invoke additional handler if provided
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold">Task Created Successfully!</h2>
        <p className="mt-4">
          Would you like to return to the task list or add another task?
        </p>
        <div className="flex justify-end space-x-4 mt-4">
        <Link href="/tasks" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Return to List
        </Link>
          <button
            onClick={handleAddAnother}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Another
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showSuccessModal && <SuccessModal />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ensure dropdowns are outside of any conditional rendering that might prevent their update */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Reference Type
          </label>
          <select
            name="referenceType"
            value={localData.referenceType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select a Reference Type</option>
            <option value="Claim">Claim</option>
            <option value="Dispute">Dispute</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Audit">Audit</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={localData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select Status</option>
            <option value="notStarted">Not Started</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {mode === "edit" && (
          <div className="col-span-2 mt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isSaveEnabled}
              className={`px-4 py-2 rounded ${
                isSaveEnabled
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkItemComponent;
