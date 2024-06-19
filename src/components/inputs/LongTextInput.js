import React from "react";

const LongTextInput = ({ label, value, onChange, placeholder, id }) => {
	return (
		<div className="flex flex-col gap-2">
			<label for={id} className="text-xs font-semibold">
				{label}
			</label>
			<textarea
				className="border border-solid border-pepper/10 h-72 rounded-2xl p-4"
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			></textarea>
		</div>
	);
};

export default LongTextInput;
