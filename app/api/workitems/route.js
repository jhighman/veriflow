import { NextResponse } from 'next/server';
import { listWorkItems } from '../../../lib/action'; // Import the listWorkItems function

export async function GET(req) {
  // Check if req is defined before accessing its properties
  if (!req) {
    console.error("Request object is undefined");
    return NextResponse.error("Internal Server Error", { status: 500 });
  }

  // Ensure req.query exists, otherwise set default values
  let page = 1, limit = 10;
  if (req.query) {
    page = req.query.page || 1;
    limit = req.query.limit || 10;
  }

  const pageNumber = parseInt(page, 10);

  try {
    console.log("Fetching work items with page:", pageNumber, "and limit:", limit);
    const { totalItems, workItems, totalPages, currentPage } = await listWorkItems(pageNumber, parseInt(limit, 10));
    console.log("Work items fetched successfully:", workItems);
    return NextResponse.json({ totalItems, workItems, totalPages, currentPage });
  } catch (error) {
    console.error("Error fetching work items:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
