export interface UserData {
  name: string;
  email: string;
  userId: string;
  posts: Posts[];
  admin?: boolean;
}

export interface AuthUserData {
  name: string;
  userId: string;
  email: string;
  admin?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: Posts[];
}

interface Posts {
  authorId: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
  published: string;
}
