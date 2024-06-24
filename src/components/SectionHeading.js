import React from "react";

const SectionHeading = ({ children, icon }) => {
	return (
		<div className="flex items-center border-b border-r-0 border-l-0 border-t-0 border-solid border-pepper/20">
			<i class={`fa-solid fa-${icon} p-4 text-pepper/30`}></i>
			<h3 class="text-pepper font-semibold text-md">{children}</h3>
		</div>
	);
};

export default SectionHeading;
