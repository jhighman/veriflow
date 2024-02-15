import React from "react";
import useFormLogic from "../components/useFormLogic";
import Link from "next/link";

const VerificationFormComponent = () => {
  const initialFields = {
    workflowId: "",
  };

  const {
    formData,
    handleChange,
    handleSave,
    handleReset,
    isSaveEnabled,
    showSuccessModal,
    error,
  } = useFormLogic({
    initialFields,
    domainEntity: "Verification",
    apiSaveRoute: "/api/claims/",
    onSaveSuccess: () => console.log("Verification saved successfully."),
    onAddAnother: () => console.log("Adding another verification."),
  });

  // Extend handleChange to validate workflowId is a number
  const handleNumberChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value) && value.trim() !== "") {
      // Check if the value is a number
      handleChange(event); // If it's a number, proceed with the original handleChange
    }
  };

  return (
    <div>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">
              Verification Created Successfully!
            </h2>
            <p className="mt-4">
              Would you like to return to the list or add another verification?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <Link href="/verifications">
                <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Return to List
                </span>
              </Link>
              <button
                onClick={handleReset}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Another
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-4xl mx-auto p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Workflow ID (Must be a number):
              <input
                type="text" // Keeping type as text to allow validation before conversion
                name="workflowId"
                value={formData.workflowId}
                onChange={handleNumberChange} // Use the adapted handleChange for numbers
                className="mt-1"
              />
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="col-span-full mt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isSaveEnabled || formData.workflowId === ""}
              className={`px-4 py-2 rounded ${
                isSaveEnabled && formData.workflowId !== ""
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerificationFormComponent;
