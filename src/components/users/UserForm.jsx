import React, { useState, useEffect } from 'react';
import { useUsers } from '../../contexts/UserContext';

function UserForm({ user, onClose }) {
  const { addUser, editUser } = useUsers();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        fullName: user.fullName || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (user) {
        await editUser(user._id, formData);
      } else {
        await addUser(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'אירעה שגיאה בשמירת המשתמש');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'עריכת משתמש' : 'משתמש חדש'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="username">שם משתמש</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">שם מלא</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              סיסמה {user && '(השאר ריק אם אין שינוי)'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!user}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {user ? 'עדכן' : 'צור משתמש'}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;