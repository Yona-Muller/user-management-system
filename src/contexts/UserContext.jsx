import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getAllUsers, createUser, deleteUser, updateUser } from '../services/api';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchUsers = useCallback(async () => {
    if (!token) {
      setError('No authentication token available');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message || 'שגיאה ביצירת משתמש חדש');
      throw err;
    }
  };

  const editUser = async (id, userData) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers(prev => prev.map(user => 
        user._id === id ? updatedUser : user
      ));
      return updatedUser;
    } catch (err) {
      setError(err.message || 'שגיאה בעדכון המשתמש');
      throw err;
    }
  };

  const removeUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message || 'שגיאה במחיקת המשתמש');
      throw err;
    }
  };



  return (
    <UserContext.Provider value={{
      users,
      loading,
      error,
      fetchUsers,
      deleteUser,
      addUser,
      editUser,
      removeUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;