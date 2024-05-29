export interface CatchReportData {
  id: string;
  location: string;
  species: string;
  bait: string;
  method: string;
  weather: string;
  authorId: string;
  waterTemp?: number;
  notes?: string;
  image?: string;
  weight?: number;
  length?: number;
  postId?: string;
}

export interface NewCatchReportData {
    catchReportId: string;
    newLocation?: string;
    newSpecies?: string;
    newWeight?: number;
    newLength?: number;
    newBait?: string;
    newMethod?: string;
    newWeather?: string;
    newWaterTemp?: number;
    newNotes?: string;
    newImage?: string;
}

export interface PostData {
  id: string;
  title: string;
  content: String;
  image?: string;
  published: Boolean;
  authorId: string;
}

export interface NewPostData {
    postId: string;
    newTitle?: string;
    newContent?: string;
    newImage?: string;
}