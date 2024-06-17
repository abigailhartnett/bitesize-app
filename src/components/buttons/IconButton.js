import React from "react";

const IconButton = ({ icon, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`cursor-pointer h-12 w-12 flex justify-center items-center active:text-salt rounded-lg ${className} px-4`}
		>
			<i className={`${icon} fa-solid fa-lg`}></i>
		</button>
	);
};

export default IconButton;
