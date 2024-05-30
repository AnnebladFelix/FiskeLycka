import axios from "axios";
import { CatchReportData, NewCatchReportData, PostData, NewPostData } from "../src/interfaces/postInterfaces";

// Catch report operation logic
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
      "http://10.0.2.2:3000/api/posts/getCatchReports"
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

// Post operation logic
export async function createPost(postData: PostData) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/posts/createPost",
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
      "http://10.0.2.2:3000/api/posts/getPosts"
    );
    console.log("🚀 ~ fetchPosts ~ response:", response)
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const updatePost = async (updatedData: NewPostData) => {
  try {
    const response = await axios.patch(
      'http://localhost:3000/api/posts/updatePost',
      {
        ...updatedData,
      }
    );

    console.log('Post updated successfully:', response.data.updatedPost);
  } catch (error: any) {
    console.error('Error updating post:', error.message);
  }
};