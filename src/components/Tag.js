import React from "react";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({ label, type, onClick }) => {
	return (
		<div
			className={`flex items-center h-fit text-xs font-semibold rounded-full px-2 py-1 uppercase tracking-wide border border-solid border-black`}
		>
			{label}
			{type === "close" && (
				<div className="pl-2 text-xs" onClick={onClick}>
					<i class="fa-solid fa-circle-xmark"></i>
				</div>
			)}
		</div>
	);
};

export default Tag;
