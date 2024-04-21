import React from "react";
import Icon from "./Icon";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({ label, type, onClick }) => {
	return (
		<div
			className={`flex items-center h-fit text-xs font-semibold rounded-full px-2 py-1 uppercase tracking-wide border border-solid border-black`}
		>
			{label}
			{type === "close" && (
				<div className="pl-2 text-xs" onClick={onClick}>
					<Icon icon={faXmarkCircle} />
				</div>
			)}
		</div>
	);
};

export default Tag;
