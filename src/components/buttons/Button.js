import React from "react";

const Button = ({ text, onClick }) => {
	return (
		<div className="border border-solid border-black">
			<button onClick={onClick}>{text}</button>
		</div>
	);
};

export default Button;
