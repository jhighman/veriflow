import { NextResponse } from 'next/server';
import { listClaims, fetchAndHandleClaim, addClaim } from '../../../lib/action';

export async function GET(req) {
  console.log("++++++++++++++");
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('workflowId'); // Changed from workflowId to claimId
  console.log('Fetching Claim with ID:', id);
  
  // Handling fetching a single claim if claimId is present
  if (req.nextUrl.searchParams.has('workflowId')) {
    const claimIdStr = req.nextUrl.searchParams.get('workflowId');
    try {
      const claim = await fetchAndHandleClaim(claimIdStr);
      if (claim) {
        return NextResponse.json(claim);
      } else {
        return new NextResponse('Claim not found', { status: 404 });
      }
    } catch (error) {
      console.error("Error fetching the claim:", error);
      return NextResponse.error(error.message, { status: 500 });
    }
  }

  // Logic for listing claims with pagination
  let page = 1, limit = 10;
  if (req.query) {
    page = req.query.page || 1;
    limit = req.query.limit || 10;
  }

  const pageNumber = parseInt(page, 10);

  try {
    console.log("Fetching claims with page:", pageNumber, "and limit:", limit);
    const { totalItems, claims, totalPages, currentPage } = await listClaims(pageNumber, parseInt(limit, 10));
    console.log("Claims fetched successfully:", claims);
    return NextResponse.json({ totalItems, claims, totalPages, currentPage });
  } catch (error) {
    console.error("Error fetching claims:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function POST(req) {
  console.log('______________');
  console.log('Received POST request for creating a claim with URL:', req.url);
  console.log('Headers:', req.headers);

  try {
    const body = await req.json();
    console.log('Request body for new claim:', body);

    if (!body.workflowId) {
      console.error('Validation failed: Missing required fields for claim');
      return new NextResponse('Missing required fields', { status: 400 });
    }

    console.log('Attempting to add claim with body:', body);
    const newClaim = await addClaim(body);
    console.log('Claim added successfully:', newClaim);

    return new NextResponse(JSON.stringify(newClaim), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error creating a new claim:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}