import React from "react";

const TextInput = ({ label, value, onChange, id }) => {
	return (
		<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
			<label htmlFor={id} className="text-xs font-semibold">
				{label}
			</label>
			<input
				type="text"
				id="item"
				value={value}
				onChange={onChange}
				className="font-semibold capitalize bg-transparent"
			/>
		</div>
	);
};

export default TextInput;
