import React from "react";

const SectionHeading = ({ children, icon, color, className }) => {
	return (
		<div
			className={`flex items-center py-1 sticky top-0 bg-salt shadow-sm shadow-pepper/05 z-10 px-1 mb-1 ${className}`}
		>
			<i class={`${icon} p-4 ${color} text-xl`}></i>
			<h3 class="text-pepper capitalize text-lg font-bold">{children}</h3>
		</div>
	);
};

export default SectionHeading;
