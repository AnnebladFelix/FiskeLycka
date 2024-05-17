import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

export const fetchUsers = async () => {
  try {
      const response = await axios.get<User[]>(
          "https://fiskelycka.netlify.app/api/users",
          { timeout: 10000 }
      );
      return response.data;
  } catch (error) {
      console.error(error);
      return [];
  }
};

export const addUser = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post<User>(
            "https://fiskelycka.netlify.app/api/users",
            { name, email, password }
        );
        console.log(
            `Created new user: ${response.data.email} (ID: ${response.data.id})`
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Error creating user");
        }
    }
};