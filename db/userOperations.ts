import axios from "axios";
import { User } from "../src/interfaces/userInterfaces";

export const fetchUsers = async () => {
    try {
        const response = await axios.get<User[]>(
            "https://fiskelycka.netlify.app/api/users/getUsers",
            { timeout: 10000 }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addUser = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        const response = await axios.post<User>(
            "https://fiskelycka.netlify.app/api/users/register",
            { name, email, password }
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
        const { success, userId, admin, name } = response.data;

        if (success) {
            return { success: true, userId, admin, name };
        } else {
            return { success: false, message: "Invalid credentials" };
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

// Function to fetch user by id.
export async function fetchUserById(id: string) {
    try {
        const response = await axios.get(`https://fiskelycka.netlify.app/api/users/getUserById?userId=${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}

// Function to update user name
export async function updateUserName(userId: string, newName: string) {
    try {
        const response = await axios.post('https://fiskelycka.netlify.app/api/users/updateUserName', {
            userId: userId,
            newName: newName,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Network response was not ok: ${error}`);
    }
}


// Function to update user password
export async function updateUserPassword(userId: string, newPassword: string) {
    try {
        const response = await axios.post('https://fiskelycka.netlify.app/api/users/updateUserPW', {
            userId: userId,
            newPassword: newPassword,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Network response was not ok: ${error}`);

    }
}