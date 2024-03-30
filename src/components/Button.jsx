import React from 'react';

function Button({ children, type = 'button', bgColor = 'bg-blue-600', textColor = 'text-white', className = '', ...props }) {
  const classes = `px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`;

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;