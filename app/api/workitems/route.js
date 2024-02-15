import { NextResponse } from 'next/server';
import { listWorkItems, fetchAndHandleWorkItem,addWorkItem } from '../../../lib/action';

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('workflowId');
  console.log('_______________');
  console.log(id);
  // Handling fetching a single work item if workflowId is present
  if (req.nextUrl.searchParams.has('workflowId')) {
    const workflowIdStr = req.nextUrl.searchParams.get('workflowId');
    try {
      const workItem = await fetchAndHandleWorkItem(workflowIdStr);
      if (workItem) {
        return NextResponse.json(workItem);
      } else {
        return new NextResponse('Work item not found', { status: 404 });
      }
    } catch (error) {
      console.error("Error fetching the work item:", error);
      return NextResponse.error(error.message, { status: 500 });
    }
  }

  // Below remains your existing logic for listing work items with pagination
  // This part is unchanged and follows your initial setup
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

export async function POST(req) {
  console.log('Received POST request with URL:', req.url);
  console.log('Headers:', req.headers);

  try {
    // Parsing JSON body from Next.js request
    const body = await req.json();
    console.log('Request body:', body);

    // Basic validation logging
    if (!body.referenceType || !body.status) {
      console.error('Validation failed: Missing required fields');
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Log before attempting to add the work item
    console.log('Attempting to add work item with body:', body);
    const newWorkItem = await addWorkItem(body);
    console.log('Work item added successfully:', newWorkItem);

    // Respond with the created work item and a 201 Created status
    return new NextResponse(JSON.stringify(newWorkItem), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error creating a new work item:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
