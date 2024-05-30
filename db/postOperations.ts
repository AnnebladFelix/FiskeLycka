import axios from "axios";
import { CatchReportData, NewCatchReportData, PostData, NewPostData } from "../src/interfaces/postInterfaces";

// Catch report operation logic
export async function createCatchReport(catchReportData: CatchReportData) {
  try {
    const response = await axios.post(
      "https://fiskelycka.netlify.app/api/posts/createCatchReport",
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
      "https://fiskelycka.netlify.app/api/posts/getCatchReports"
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
      'https://fiskelycka.netlify.app/api/posts/updateCatchReport',
      {
        ...updatedData,
      }
    );

    console.log('Catch report updated successfully:', response.data.updatedCatchReport);
  } catch (error: any) {
    console.error('Error updating catch report:', error.message);
  }
};

// Post operation logic
export async function createPost(postData: PostData) {
  try {
    const response = await axios.post(
      "https://fiskelycka.netlify.app/api/posts/createPost",
      {
        post: postData,
      }
    );

    if (response.status === 201) {
      console.log("Post created:", response.data.message);
    } else {
      console.error("Error creating post:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function fetchPosts() {
  try {
    const response = await axios.get<PostData[]>(
      "https://fiskelycka.netlify.app/api/posts/getPosts"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const updatePost = async (updatedData: NewPostData) => {
  try {
    const response = await axios.patch(
      'https://fiskelycka.netlify.app/api/posts/updatePost',
      {
        ...updatedData,
      }
    );

    console.log('Post updated successfully:', response.data.updatedPost);
  } catch (error: any) {
    console.error('Error updating post:', error.message);
  }
};