import React from 'react';


const Card = ({ title, description, className = '' }) => {
  return (
    <div className={`border rounded shadow p-4 ${className}`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
