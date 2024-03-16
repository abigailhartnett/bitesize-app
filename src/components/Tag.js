import React from "react";
import Icon from "./Icon";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

// tag--${label.replace(" ", "-").toLowerCase()}

const Tag = ({ label, type }) => {
	const colorClass = () => {
		if (type === "close") {
			return "bg-red-100";
		} else if (label === "low") {
			return "bg-yellow-100";
		} else if (label === "in stock") {
			return "bg-green-100";
		} else if (label === "out") {
			return "bg-gray-200";
		} else {
			return "bg-gray-100";
		}
	};

	return (
		<div
			className={`flex items-center h-fit text-xs font-semibold rounded-full px-2 py-1 uppercase tracking-wide ${colorClass()}`}
		>
			{label}
			{type === "close" && (
				<div className="pl-2 text-xs">
					<Icon icon={faXmarkCircle} />
				</div>
			)}
		</div>
	);
};

export default Tag;
