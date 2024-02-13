//actiopn.js
import WorkItem from "../models/workItemModel";
import db from "./db";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

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
        archivedDate: dates.archivedDate
      }
    });

    await newWorkItem.save();

    // Optionally, revalidate the path if you're using ISR (Incremental Static Regeneration)
    // await revalidatePath('/your-path');

    // If you need to redirect after the operation
    // redirect('/your-redirect-path');
  } catch (error) {
    throw new Error("Failed To Create WorkItem " + error);
  }
}
