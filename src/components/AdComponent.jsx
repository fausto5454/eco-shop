import React from 'react';
import PostersPage from './PostersPage';

const AdComponent = ({ onNavigate }) => {
  return (
    <div className="my-8 text-center text-gray-400">
      <PostersPage onNavigate={onNavigate} />
    </div>
  );
};

export default AdComponent;