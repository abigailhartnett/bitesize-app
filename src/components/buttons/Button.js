import React from "react";

const Button = ({ children, onClick, type }) => {
	return (
		<div className="bg-pepper text-salt p-2 m-2 text-center font-semibold max-w-sm">
			<button onClick={onClick} type={type}>
				{children}
			</button>
		</div>
	);
};

export default Button;
