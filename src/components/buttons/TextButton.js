import React from "react";

const TextButton = ({ children, onClick, type, className }) => {
	return (
		<button
			onClick={onClick}
			type={type ? type : "button"}
			className={`underline font-semibold ${className}`}
		>
			{children}
		</button>
	);
};

export default TextButton;
