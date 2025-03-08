import React from "react";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({ label, onClick, color, isActive, activeColor, className }) => {
	const colors = {
		default: "border border-solid border-pepper/10",
		transparent: `bg-transparent outline-none text-pepper/75`,
	};

	const activeColors = {
		white: "bg-white shadow-sm shadow-pepper/10",
		green: "border-none text-broccoli/75 bg-mint shadow-sm shadow-broccoli/20",
	};

	return (
		<div
			className={`flex items-center h-fit font-semibold text-sm rounded-full px-4 py-1 capitalize tracking-wide cursor-pointer ${color && !isActive ? colors[color] : colors["default"]} ${isActive && activeColors[activeColor]} ${className}`}
			onClick={onClick}
		>
			<span className="whitespace-nowrap">{label}</span>
		</div>
	);
};

export default Tag;
