// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import MainMenu from "../components/MainMenu";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const VerificationsPage = () => {
  const [claims, setClaims] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Adjust the fetch URL to your API endpoint for claims
        const response = await fetch(`/api/claims?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setClaims(data.claims); // Adjust according to your actual API response structure
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
          <Link href="/verifications/new" passHref>
            <div className="inline-flex items-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm">
              <FiPlus className="mr-1 text-lg" />
              Create New Verification
            </div>
          </Link>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col h-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Adjust these headers as needed for claims */}
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claims.map((claim, index) => (
                    <tr key={index} className="text-xs">
                      <td className="px-3 py-1 whitespace-nowrap">
                        {claim.workflowId}
                      </td>
                      <td className="px-3 py-1 whitespace-nowrap flex items-center space-x-2">
                        {/* Update these links as needed for claims */}
                        <Link href={`/verifications/${claim.id}`}>
                          <span className="cursor-pointer">
                            <FiEye className="text-gray-500 hover:text-gray-700" />
                          </span>
                        </Link>
                        <Link href={`/verifications/update/${claim.id}`}>
                          <span className="cursor-pointer">
                            <FiEdit className="text-gray-500 hover:text-gray-700" />
                          </span>
                        </Link>
                        {/* Handle delete logic as appropriate */}
                        <span
                          onClick={() => {
                            /* handleDelete(claim.id) */
                          }}
                          className="cursor-pointer"
                        >
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
        {/* Pagination logic remains the same */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Link
            key={num}
            href={`?page=${num}`}
            className={`px-2 py-1 cursor-pointer ${
              page === num ? "text-white bg-blue-500" : "text-blue-500"
            }`}
          >
            {num}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default VerificationsPage;
