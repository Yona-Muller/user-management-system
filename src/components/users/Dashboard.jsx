import React, { useState, useEffect } from 'react';
import { useUsers } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import Loading from '../layout/Loading';

const Dashboard = () => {
  const { users, loading, error, fetchUsers, deleteUser } = useUsers();
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchUsers();
  }, [fetchUsers, token, navigate]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (err) {
        console.error('שגיאה במחיקת משתמש:', err);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>שגיאה: {error}</div>;
  //


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>מספר משתמשים: {users.length}</h1>
        <h2>ניהול משתמשים</h2>
        <div className="header-actions">
          <button onClick={handleAddUser} className="btn-primary">
            הוסף משתמש חדש
          </button>
          <button onClick={logout} className="btn-secondary">
            התנתק
          </button>
        </div>
      </header>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>שם משתמש</th>
              <th>שם מלא</th>
              <th>אימייל</th>
              <th>תאריך יצירה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}, {new Date(user.createdAt).toLocaleTimeString()}</td>
                <td className="actions-cell">
                  <button onClick={() => handleEditUser(user)} className="btn-edit">
                    ערוך
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)} className="btn-delete">
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUserForm && (
        <UserForm
          user={selectedUser}
          onClose={() => {
            setShowUserForm(false);
            setSelectedUser(null);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;