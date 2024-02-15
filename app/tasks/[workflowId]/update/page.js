// pages/tasks/[workflowId].js
'use client';

import React from "react";
import MainMenu from "../../../components/MainMenu";
import Breadcrumbs from "../../../components/Breadcrumbs";

const UpdateTaskPage = ({params}) => {
     // Deconstruct `params` and attempt to convert `workflowId` to a number
  const numericWorkflowId = +params.workflowId;
  const isValidId = !isNaN(numericWorkflowId) && numericWorkflowId > 0;

  if (!isValidId) {
    // Render a user-friendly error message if `workflowId` is not a valid number
    return(
        <main>
          <MainMenu />
          <Breadcrumbs />
          <div>This task does not exist or is invalid </div>
        </main>
        );
  }

  // Render the component if `workflowId` is valid
  return(
  <main>
    <MainMenu />
    <Breadcrumbs />
    <div>Update Details about task {numericWorkflowId}</div>
  </main>
  );
};

export default UpdateTaskPage;
