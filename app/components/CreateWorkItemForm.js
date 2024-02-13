import React from 'react';

const CreateWorkItemForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Here you would call your addWorkItem function or make an API request
    // e.g., await addWorkItem(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form bg-neutral p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Create Work Item</h2>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary">Status</span>
        </label>
        <input type="text" placeholder="Status" name="status" className="input input-bordered input-primary w-full max-w-xs" required />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary">Reference Type</span>
        </label>
        <input type="text" placeholder="Reference Type" name="referenceType" className="input input-bordered input-primary w-full max-w-xs" required />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary">Started Date</span>
        </label>
        <input type="date" name="startedDate" className="input input-bordered input-primary w-full max-w-xs" />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary">Completed Date</span>
        </label>
        <input type="date" name="completedDate" className="input input-bordered input-primary w-full max-w-xs" />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary">Published Date</span>
        </label>
        <input type="date" name="publishedDate" className="input input-bordered input-primary w-full max-w-xs" />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-primary">Archived Date</span>
        </label>
        <input type="date" name="archivedDate" className="input input-bordered input-primary w-full max-w-xs" />
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">Create Work Item</button>
      </div>
    </form>
  );
};

export default CreateWorkItemForm;
