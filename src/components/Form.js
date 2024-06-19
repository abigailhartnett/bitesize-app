import React from "react";

const Form = ({ children, onSubmit, successMessage, formError }) => {
	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 w-full my-8">
			{children}
			{successMessage && <div>{successMessage}</div>}
			{formError && <div>{formError}</div>}
		</form>
	);
};

export default Form;
