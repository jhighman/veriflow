import WorkItem from "../models/workItemModel";
import db from "./db";

/**
 * Lists work items with pagination.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items per page.
 * @returns {Promise<{totalItems: number, workItems: Array, totalPages: number, currentPage: number}>} - The paginated result.
 */
export async function listWorkItems(page = 1, limit = 10) {
  try {
    await db.connect();

    // Calculate the total number of work items
    const totalItems = await WorkItem.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Adjust the page number (1-indexed)
    const currentPage = page > 0 ? page : 1;

    // Fetch a page of work items
    const workItems = await WorkItem.find()
      .skip((currentPage - 1) * limit)
      .limit(limit);

    // Log the count of work items fetched
    console.log("Count of Work Items fetched:", workItems.length);

    return {
      totalItems,
      workItems,
      totalPages,
      currentPage,
    };
  } catch (error) {
    // Check if the error is due to no documents found
    if (error.name === 'MongoError' && error.message === 'No documents found') {
      console.log("No work items found.");
      return {
        totalItems: 0,
        workItems: [],
        totalPages: 0,
        currentPage: 1,
      };
    }

    // If it's a different error, re-throw it
    throw error;
  }
}

export default async function addWorkItem(FormData) {
  const { status, referenceType, dates } = Object.fromEntries(FormData);

  try {
    await db.connect();

    const newWorkItem = new WorkItem({
      status,
      referenceType,
      dates: {
        startedDate: dates.startedDate,
        completedDate: dates.completedDate,
        publishedDate: dates.publishedDate,
        archivedDate: dates.archivedDate,
      },
    });

    await newWorkItem.save();

    // Log statement here if needed for confirmation of WorkItem creation

  } catch (error) {
    console.error("Failed to create WorkItem:", error);
    throw new Error("Failed to create WorkItem " + error);
  }
}
