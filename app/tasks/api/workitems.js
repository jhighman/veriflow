// pages/api/workitems.js
import { listWorkItems } from '../../../lib/action'; // Adjust the import path as necessary

export default async function handler(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const { totalItems, workItems, totalPages, currentPage } = await listWorkItems(parseInt(page), parseInt(limit));
    res.status(200).json({ totalItems, workItems, totalPages, currentPage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
