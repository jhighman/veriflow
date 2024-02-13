'use client'
import React, { useState, useEffect } from "react";
import MainMenu from "../components/MainMenu";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from 'next/link';

const TasksPage = () => {
  const [workItems, setWorkItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchWorkItems = async () => {
      const response = await fetch(`/api/workitems?page=${page}&limit=10`);
      const data = await response.json();
      setWorkItems(data.workItems);
      setTotalPages(data.totalPages);
    };

    fetchWorkItems();
  }, [page]);

  return (
    <main>
      <MainMenu />
      <Breadcrumbs />
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold my-4">Work Items</h1>
        <ul>
          {workItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.title} - Status: {item.status}
            </li>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-2 py-1 ${page === num ? 'text-white bg-blue-500' : 'text-blue-500'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TasksPage;
