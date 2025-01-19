import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>הדף לא נמצא</h2>
      <p>מצטערים, הדף שחיפשת אינו קיים.</p>
      <button 
        className="btn-primary"
        onClick={() => navigate('/dashboard')}
      >
        חזור לדף הבית
      </button>
    </div>
  );
}

export default NotFound; 