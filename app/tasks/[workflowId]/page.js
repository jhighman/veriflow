
'use client';
import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Breadcrumbs from '../../components/Breadcrumbs';
import WorkItemComponent from '../../components/WorkItemComponent'; // Adjust the import path as necessary

const GenericTaskPage = ({ params }) => {
  const [workItem, setWorkItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkItem = async () => {
      try {
        const response = await fetch(`/api/workitems?workflowId=${params.workflowId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch work item');
        }
        const data = await response.json();
        setWorkItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkItem();
  }, [params.workflowId]);

  if (loading) {
    return (
      <main>
        <MainMenu />
        <Breadcrumbs />
        <div>Loading work item details...</div>
      </main>
    );
  }

  if (error || !workItem) {
    return (
      <main>
        <MainMenu />
        <Breadcrumbs />
        <div>{error || 'This task does not exist or is invalid'}</div>
      </main>
    );
  }

  // Render the WorkItemComponent with work item details in display mode
  return (
    <main>
      <MainMenu />
      <Breadcrumbs />
      {/* Now using WorkItemComponent to display the work item details */}
      <WorkItemComponent mode="display" data={workItem} />
    </main>
  );
};

export default GenericTaskPage;
