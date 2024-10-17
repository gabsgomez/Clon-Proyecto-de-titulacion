// ButtonComponent.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ButtonComponent.css';

const ButtonComponent = ({ iconClass, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button className="responsive-button" onClick={handleClick}>
      <i className={iconClass}></i>
    </button>
  );
};

export default ButtonComponent;

