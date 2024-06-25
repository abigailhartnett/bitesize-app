import React from "react";

const SectionHeading = ({ children, icon, color }) => {
	return (
		<div className="flex items-center border-b border-r-0 border-l-0 border-t-0 border-solid border-pepper/20 pt-4">
			<i class={`${icon} p-4 ${color}`}></i>
			<h3 class="text-pepper font-semibold text-md capitalize">{children}</h3>
		</div>
	);
};

export default SectionHeading;
