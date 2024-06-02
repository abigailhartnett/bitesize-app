import React from "react";

const Checkbox = ({ id, label }) => {
	return (
		<div className="pr-2 flex gap-2 items-center relative">
			<input
				type="checkbox"
				className="appearance-none h-4 w-4 border border-pepper checked:bg-pepper checked:border-transparent focus:outline-raspberry peer shrink-0"
				id={id}
			></input>
			{/* <i className="fas fa-check text-raspberry pl-2 hidden peer-checked:block absolute left-0"></i> */}
			<label htmlFor={id} className="peer-checked:line-through">
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
