const BASE_URL = 'https://server-n42x.onrender.com/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Using token:', token);

  return {
    'Content-Type': 'application/json',
    'Authorization': token
  };
};

export const getAllUsers = async () => {
  try {
    const headers = getHeaders();
    console.log('Request headers:', headers);

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    const data = await response.json();
    console.log('Users data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const deleteUserApi = async (userId) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`https://server-n42x.onrender.com/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'שגיאה במחיקת המשתמש');
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};