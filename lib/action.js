// Assuming this file is action.js
import WorkItem from "../models/workItemModel";
import Claim from "../models/claimModel";
import db from "./db";
const INITIAL_WORKITEM_STATUS = "Not Started";
const INITIAL_WORKITEM_REFERENCE_TYPE = "claim";


// Lists claims with pagination
export async function listClaims(page = 1, limit = 10) {
  await db.connect();

  const totalItems = await Claim.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page > 0 ? page : 1;

  const claims = await Claim.find()
    .skip((currentPage - 1) * limit)
    .limit(limit);

  console.log("Count of Claims fetched:", claims.length);

  return {
    totalItems,
    claims,
    totalPages,
    currentPage,
  };
}



// Lists work items with pagination
export async function listWorkItems(page = 1, limit = 10) {
  await db.connect();

  const totalItems = await WorkItem.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page > 0 ? page : 1;

  const workItems = await WorkItem.find()
    .skip((currentPage - 1) * limit)
    .limit(limit);

  console.log("Count of Work Items fetched:", workItems.length);

  return {
    totalItems,
    workItems,
    totalPages,
    currentPage,
  };
}

// Adds a new WorkItem
export async function addWorkItem(formData) {
  const { status, referenceType, dates } = formData; // Assuming formData is already an object

  await db.connect();

  const newWorkItem = new WorkItem({
    status,
    referenceType,
  });

  await newWorkItem.save();
}


// Adds a new WorkItem
export async function addClaim(formData) {
  await db.connect();

  try {
    const { workflowId } = formData; // Destructure workflowId from formData

    let associatedWorkItemId;

    if (workflowId === undefined) {
      console.log('No workflowId provided. Creating a new WorkItem.');
      const newWorkItem = new WorkItem({
        status: INITIAL_WORKITEM_STATUS,
        referenceType: INITIAL_WORKITEM_REFERENCE_TYPE
        // Add other default properties here if needed
      });
      await newWorkItem.save();
      associatedWorkItemId = newWorkItem._id;
    } else {
      console.log(`Finding WorkItem with workflowId: ${workflowId}`);
      const workItem = await WorkItem.findOne({ workflowId });

      if (!workItem) {
        console.error(`No WorkItem found with workflowId: ${workflowId}`);
        throw new Error(`No WorkItem found with workflowId: ${workflowId}`);
      }

      console.log(`Found WorkItem: ${workItem}`);
      associatedWorkItemId = workItem._id;
    }

    // Create the Claim with the associated WorkItem
    console.log(`Creating claim with associated WorkItemId: ${associatedWorkItemId}`);
    const newClaim = new Claim({ ...formData, workItem: associatedWorkItemId });
    await newClaim.save();

    console.log('Claim created successfully:', newClaim);
    return newClaim; // Optionally return the created claim for further processing or response
  } catch (error) {
    console.error('Error creating claim:', error);
    throw error; // Rethrow or handle the error appropriately
  }
}


// Fetches a single claim by its workflowId
export async function getClaimByWorkflowId(workflowIdStr) {
  const workflowId = Number(workflowIdStr);
  if (isNaN(workflowId)) {
    throw new Error(`Invalid workflowId: ${workflowIdStr}`);
  }

  await db.connect();
  const workItem = await Claim.findOne({ workflowId });
  return workItem;
}

// Fetches a single work item by its workflowId
export async function getWorkItemByWorkflowId(workflowIdStr) {
  const workflowId = Number(workflowIdStr);
  if (isNaN(workflowId)) {
    throw new Error(`Invalid workflowId: ${workflowIdStr}`);
  }

  await db.connect();
  const workItem = await WorkItem.findOne({ workflowId });
  return workItem;
}

// Fetches and handles a work item by its workflowId
export async function fetchAndHandleClaim(workflowIdStr) {
  try {
    const workItem = await getClaimByWorkflowId(workflowIdStr);
    if (claim) {
      console.log('Claom found:', claim);
      return claim; // Return or process the work item as needed
    } else {
      console.log('No claim found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching claim:', error);
    throw error; // Rethrow or handle the error as needed
  }
}

// Fetches and handles a work item by its workflowId
export async function fetchAndHandleWorkItem(workflowIdStr) {
  try {
    const workItem = await getWorkItemByWorkflowId(workflowIdStr);
    if (workItem) {
      console.log('Work item found:', workItem);
      return workItem; // Return or process the work item as needed
    } else {
      console.log('No work item found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching work item:', error);
    throw error; // Rethrow or handle the error as needed
  }
}
