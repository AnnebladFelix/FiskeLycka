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

export const addUser = async (name: string, email: string, password: string) => {
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
        const { success, userId } = response.data;

        if (success) {
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

// Function to fetch logged-in user
export async function fetchUserById(id: string) {
    try {
        const response = await axios.get(`https://fiskelycka.netlify.app/api/users/loggedInUser/${id}`);
        console.log("🚀 ~ fetchUserById ~ response:", response.data)
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}


// Function to update user name
export async function updateUserName(userId: string, newName: string) {
    const response = await fetch('https://fiskelycka.netlify.app/api/users/updateUserName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            newName: newName,
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}

// Function to update user password
export async function updateUserPassword(userId: string, newPassword:string) {
    const response = await fetch('https://fiskelycka.netlify.app/api/users/updateUserPW', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            newPassword: newPassword,
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}
