import React from "react";

const TextButton = ({ children, onClick, type, className }) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={`underline font-semibold ${className}`}
		>
			{children}
		</button>
	);
};

export default TextButton;
