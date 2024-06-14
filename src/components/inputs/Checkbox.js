import React from "react";

const Checkbox = ({ id, label, onChange, checked }) => {
	return (
		<div className="relative">
			<input
				onChange={onChange}
				checked={checked}
				type="checkbox"
				className="hover:cursor-pointer appearance-none h-4 w-4 border-2 border-pepper checked:bg-pepper checked:border-transparent focus:outline-pomegranate peer shrink-0 rounded-sm"
				id={id}
				aria-label={label}
			></input>
			<i className="fas fa-check fa-sm text-salt pl-2 hidden peer-checked:block absolute top-2.5 right-0.5 pointer-events-none"></i>
		</div>
	);
};

export default Checkbox;
