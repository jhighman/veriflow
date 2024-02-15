import React, { useState, useEffect } from 'react';

const WorkItemComponent = ({ mode, data = {}, onSave }) => {
  // Initialize localData with safety checks for undefined data
  const [localData, setLocalData] = useState({
    referenceType: data?.referenceType || '',
    status: data?.status || '',
  });

  // Determine if the save button should be enabled
  const isSaveEnabled = localData.referenceType && localData.status;

  useEffect(() => {
    // Synchronize localData with data when data changes
    setLocalData({
      referenceType: data?.referenceType || '',
      status: data?.status || '',
    });
  }, [data.referenceType, data.status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Reference Type</label>
          {mode === 'edit' ? (
            <select
              name="referenceType"
              value={localData.referenceType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>Select a Reference Type</option>
              <option value="Claim">Claim</option>
              <option value="Dispute">Dispute</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Audit">Audit</option>
            </select>
          ) : (
            <p className="mt-1">{localData.referenceType || 'N/A'}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          {mode === 'edit' ? (
            <select
              name="status"
              value={localData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="notStarted">Not Started</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          ) : (
            <p className="mt-1">{localData.status || 'N/A'}</p>
          )}
        </div>

        {mode === 'edit' && (
          <div className="col-span-2 mt-4">
            <button
              type="button"
              onClick={() => onSave(localData)}
              disabled={!isSaveEnabled}
              className={`px-4 py-2 rounded ${isSaveEnabled ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkItemComponent;
