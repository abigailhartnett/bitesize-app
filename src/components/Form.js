import React from "react";

const Form = ({ children, onSubmit, successMessage, formError, formTitle }) => {
	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 w-full my-8">
			<h2 className="text-center text-lg font-bold my-4">{formTitle}</h2>
			{children}
			{successMessage && <div>{successMessage}</div>}
			{formError && <div>{formError}</div>}
		</form>
	);
};

export default Form;
