// Assuming this file is action.js
import WorkItem from "../models/workItemModel";
import db from "./db";

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
