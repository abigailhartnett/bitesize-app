import React from "react";

const IconButton = ({ icon, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="cursor-pointer text-pepper active:bg-pepper hover:text-pepper/50 h-12 w-12 flex justify-center items-center active:text-salt rounded-lg"
		>
			<i className={`${icon} fa-lg`}></i>
		</button>
	);
};

export default IconButton;
