import React from "react";

const Form = ({ children, onSubmit, successMessage, formError, formTitle }) => {
	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col gap-4 w-full relative top-0"
		>
			<div className="flex items-center border-b border-r-0 border-l-0 border-t-0 border-solid border-pepper/20">
				<i class="fa-solid fa-pencil px-4 text-pepper/30"></i>
				<h2 className="text-lg font-bold my-3">{formTitle}</h2>
			</div>
			{children}
			{successMessage && <div>{successMessage}</div>}
			{formError && <div>{formError}</div>}
		</form>
	);
};

export default Form;
