import React from "react";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({ label, onClick }) => {
	return (
		<div
			className={`flex items-center h-fit text-xs font-semibold rounded-2xl px-4 py-3.5 uppercase tracking-wide border border-solid border-[#29292914] cursor-pointer`}
			onClick={onClick}
		>
			<span className="whitespace-nowrap">{label}</span>
		</div>
	);
};

export default Tag;
