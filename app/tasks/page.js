// @ts-nocheck
'use client';
import React, { useState, useEffect } from "react";
import MainMenu from "../components/MainMenu";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from 'next/link';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

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
        const response = await fetch(`/api/workitems?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setWorkItems(data.workItems);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [page]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow">
        <MainMenu />
        <Breadcrumbs />
        <div className="container mx-auto px-4 py-4 h-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col h-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Started
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {workItems.map((item, index) => (
  <tr key={index} className="text-xs">
    <td className="px-3 py-1 whitespace-nowrap">
      {item.workflowId}
    </td>
    <td className="px-3 py-1 whitespace-nowrap">
      {item.status}
    </td>
    <td className="px-3 py-1 whitespace-nowrap">
      {item.startedDate ? new Date(item.startedDate).toLocaleDateString() : 'N/A'}
    </td>
    <td className="px-3 py-1 whitespace-nowrap">
      {item.completedDate ? new Date(item.completedDate).toLocaleDateString() : 'N/A'}
    </td>
    <td className="px-3 py-1 whitespace-nowrap flex items-center space-x-2">
      <Link href={`/tasks/${item.workflowId}`}>
        <span className="cursor-pointer">
          <FiEye className="text-gray-500 hover:text-gray-700" />
        </span>
      </Link>
      <Link href={`/tasks/update/${item.workflowId}`}>
        <span className="cursor-pointer">
          <FiEdit className="text-gray-500 hover:text-gray-700" />
        </span>
      </Link>
      <span onClick={() => {/* handleDelete(item.workflowId) */}} className="cursor-pointer">
        <FiTrash2 className="text-gray-500 hover:text-gray-700" />
      </span>
    </td>
  </tr>
))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="pagination bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <Link
            key={num}
            href={`?page=${num}`}
            className={`px-2 py-1 cursor-pointer ${page === num ? 'text-white bg-blue-500' : 'text-blue-500'}`}
          >
            {num}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default TasksPage;

