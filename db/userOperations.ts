import axios from "axios";
import bcrypt from 'react-native-bcrypt';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
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
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
        const response = await axios.post<User>(
            "https://fiskelycka.netlify.app/api/users",
            { name, email, hashedPassword }
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

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `https://fiskelycka.netlify.app/api/users/login`,
            { email, password }
        );
        const { success, userId } = response.data;

        if (success) {
            console.log(`User logged in: ${email} (ID: ${userId})`);
            return { success: true, userId };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error: any) {
        console.error(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error("Error logging in user");
        }
    }
};


