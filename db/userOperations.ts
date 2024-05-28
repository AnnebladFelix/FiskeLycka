import axios from "axios";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const fetchUsers = async () => {
    try {
        const response = await axios.get<User[]>(
            "https://fiskelycka.netlify.app/api/users/getUser",
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

// Function to fetch logged-in user
export const fetchLoggedInUser = async () => {
    try {
        const response = await axios.get<User>(
            "https://fiskelycka.netlify.app/api/users/loggedInUser",
            { timeout: 10000 }
        );
        return response.data.id;
    } catch (error) {
        console.error("Error fetching logged-in user:", error);
        return null;
    }
};

// Function to update user name
export async function updateUserName(newName: string) {
    const userId = await fetchLoggedInUser();
    try {
        const response = await axios.post(`https://fiskelycka.netlify.app/api/users/updateUser`, { newName, userId });
        return response.data;
    } catch (error) {
        throw new Error("Network response was not ok");
    }
}


// Function to update user password
export async function updateUserPassword(newPassword: string) {
    const userId = await fetchLoggedInUser();
    const response = await fetch(
        "https://fiskelycka.netlify.app/api/users/updateUser",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                newPassword: newPassword,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
}
