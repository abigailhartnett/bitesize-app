import React from "react";

const IconButton = ({ icon, onClick, className, faStyle, size, type }) => {
	return (
		<button
			onClick={onClick}
			className={`cursor-pointer h-12 w-12 flex justify-center items-center active:text-salt rounded-lg ${className} px-4`}
			type={type ? type : "button"}
		>
			<i className={`${icon} ${faStyle} fa-${size}`}></i>
		</button>
	);
};

export default IconButton;
