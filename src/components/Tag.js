import React from "react";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({ label, onClick, className }) => {
	return (
		<div
			className={`flex items-center h-fit font-semibold rounded-2xl px-4 py-3.5 capitalize tracking-wide border border-solid border-[#29292914] cursor-pointer ${className}`}
			onClick={onClick}
		>
			<span className="whitespace-nowrap">{label}</span>
		</div>
	);
};

export default Tag;
