// @ts-nocheck
'use client';
import React, { useState, useEffect } from "react";
import MainMenu from "../components/MainMenu";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from 'next/link';

const TasksPage = () => {
  const [workItems, setWorkItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        console.log("Fetching initial data...");
        const response = await fetch(`/api/workitems?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        console.log("Initial data fetched:", data);
        setWorkItems(data.workItems);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [page]); // Include page in the dependency array if you want to refetch when page changes

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <MainMenu />
      <Breadcrumbs />
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold my-4">Work Items</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul>
              {workItems.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.title} - Status: {item.status}
                </li>
              ))}
            </ul>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <Link 
                  key={num} 
                  href={`?page=${num}`} 
                  className={`px-2 py-1 cursor-pointer ${page === num ? 'text-white bg-blue-500' : 'text-blue-500'}`}
                  style={{ display: 'inline-block' }} // Apply any necessary styles here
                >
                  {num}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TasksPage;
