import React from "react";

const Checkbox = ({
	id,
	ariaLabel,
	label,
	onChange,
	checked,
	forInput,
	className,
}) => {
	return (
		<div className="flex items-center">
			<div
				className={`relative p-4 h-12 w-12 flex items-center justify-center ${className}`}
			>
				<input
					onChange={onChange}
					checked={checked}
					type="checkbox"
					className="hover:cursor-pointer appearance-none h-6 w-6 border-2 border-pepper/20 checked:bg-rose checked:border-transparent peer shrink-0 rounded-full"
					id={id}
					aria-label={ariaLabel}
				></input>
				<i
					className={`fas fa-check fa-sm ${checked ? "text-pomegranate" : "text-salt"} hidden peer-checked:block absolute pointer-events-none top-25% right-25%`}
				></i>
			</div>
			<label
				htmlFor={forInput}
				className="font-semibold capitalize bg-transparent"
			>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
