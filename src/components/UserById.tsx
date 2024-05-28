import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserById } from '../../db/userOperations';
import { UserData } from '../interfaces/userInterfaces';

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>();
  const { user } = useAuth();
  const userId = user?.userId ?? "";

  useEffect(() => {
    const fetchUserData = async () => {
        if (userId) {
            const data = await fetchUserById(userId);
            setUserData(data);
        }
    };
    fetchUserData();
  }, [userId]);

  return userData;
};

// Example usage:
// import { useUserData } from '../components/UserById';
// const userData = useUserData();