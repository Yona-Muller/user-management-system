import React, { useEffect } from 'react';
import { useUsers } from '../../contexts/UserContext';
import Loading from '../layout/Loading';
const UserList = () => {
  const { users, loading, error, fetchUsers } = useUsers();

  const { language } = useLanguage(); 
  const t = translations[language];

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <Loading />;
  if (error) return <div>{t.error}: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};

export default UserList;
