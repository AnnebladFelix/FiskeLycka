import axios from "axios";
import { CatchReportData, NewCatchReportData } from "../src/interfaces/postInterfaces";

export async function createCatchReport(catchReportData: CatchReportData) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/posts/createCatchReport",
      {
        catchReport: catchReportData,
      }
    );

    if (response.status === 201) {
      console.log("Catch report created:", response.data.message);
    } else {
      console.error("Error creating catch report:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function fetchCatchReports() {
  try {
    const response = await axios.get<CatchReportData[]>(
      "http://localhost:3000/api/posts/getCatchReports"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const updateCatchReport = async (updatedData: NewCatchReportData) => {
  try {
    const response = await axios.patch(
      'http://localhost:3000/api/posts/updateCatchReport',
      {
        ...updatedData,
      }
    );

    console.log('Catch report updated successfully:', response.data.updatedCatchReport);
  } catch (error: any) {
    console.error('Error updating catch report:', error.message);
  }
};
