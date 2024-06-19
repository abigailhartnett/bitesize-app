import React from "react";

const Select = ({ label, options, value, onChange }) => {
	const optionList = options.map((option) => (
		<option value={option}>{option}</option>
	));

	return (
		<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
			<label htmlFor="status" className="text-xs font-semibold">
				{label}
			</label>
			<select
				id="status"
				value={value}
				onChange={onChange}
				className="font-semibold capitalize bg-transparent"
			>
				{optionList}
			</select>
		</div>
	);
};

export default Select;
