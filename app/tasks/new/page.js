
'use client';
import React from 'react';
import MainMenu from '../../components/MainMenu';
import Breadcrumbs from '../../components/Breadcrumbs';
import WorkItemComponent from '../../components/WorkItemComponent'; // Adjust the import path as necessary

const NewWorkItemPage = () => {
  // Removed state and methods related to submission

  return (
    <main>
      <MainMenu />
      <Breadcrumbs />
      {/* Directly render the WorkItemComponent with mode 'new' to distinguish the creation process */}
      <WorkItemComponent mode="edit" />
      {/* Removed form and submission button since that logic is now internal to the WorkItemComponent */}
    </main>
  );
};

export default NewWorkItemPage;

