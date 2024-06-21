import React from "react";

const Number = ({ label, value, onChange, name }) => {
	return (
		<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
			<label htmlFor={name} className="text-xs font-semibold">
				{label}
			</label>
			<input
				type="number"
				name={name}
				value={value}
				onChange={onChange}
				className="font-semibold lowercase bg-transparent"
			/>
		</div>
	);
};

export default Number;
