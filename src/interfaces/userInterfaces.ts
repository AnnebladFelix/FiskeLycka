export interface UserData {
    name: string;
    email: string;
    id: string;
    posts: Posts[];
  }

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

  interface Posts {
    authorId: string;
    id: string;
    title: string;
    content: string;
    createdAt: string;
    published: string;
  }
