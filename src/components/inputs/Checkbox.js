import React from "react";

const Checkbox = ({ id, label, onChange, checked }) => {
	return (
		<div className="relative p-4 h-12 w-12 flex items-center justify-center">
			<input
				onChange={onChange}
				checked={checked}
				type="checkbox"
				className="hover:cursor-pointer appearance-none h-5 w-5 border-2 border-pepper checked:bg-pepper checked:border-transparent focus:outline-pomegranate peer shrink-0 rounded-full"
				id={id}
				aria-label={label}
			></input>
			<i className="fas fa-check fa-sm text-salt hidden peer-checked:block absolute pointer-events-none top-25% right-25%"></i>
		</div>
	);
};

export default Checkbox;
