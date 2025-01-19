const BASE_URL = 'https://server-n42x.onrender.com/api';

export const login = async (credentials) => {
  try {
    console.log('Sending login request with:', credentials);
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    });

    const data = await response.json();
    console.log('Server response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'שגיאה בהתחברות');
    }

    localStorage.setItem('token', `Bearer ${data.token}`);


    return {
      token: data.token,
      user: {
        id: data.userId || credentials.username,
        username: credentials.username
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};