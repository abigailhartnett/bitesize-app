import React, { useState } from "react";
import supabase from "../../config/supabaseClient";

const EditPantryItem = () => {
	const [name, setName] = useState("");
	const [aisle, setAisle] = useState("");
	const [status, setStatus] = useState("in stock");
	const [formError, setFormError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !aisle || !status) {
			setFormError("Please fill out all fields");
			return;
		}

		try {
			// Fix this! Needs to pull from data
			const { error } = await supabase
				.from("pantry")
				.insert([{ name, aisle, status }]);

			if (error) {
				setFormError("Could not add item");
				setSuccessMessage(null);
				console.log(error);
			} else {
				console.log([{ name, aisle, status }]);
				setFormError(null);
				setSuccessMessage(`🙌🏻 Added ${name} to pantry!`);
				setName("");
				setAisle("");
				setStatus("out");
			}
		} catch (error) {
			setSuccessMessage(null);
			setFormError("Could not add item");
			console.error("Error adding item:", error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-center text-lg font-bold">Edit Item</h2>
			<form onSubmit={handleSubmit}>
				<div className="flex gap-4">
					<label htmlFor="status">Status</label>
					<select
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="in stock">In Stock</option>
						<option value="out">Out</option>
						<option value="low">Low</option>
					</select>
				</div>
				<button className="bg-pepper text-salt font-medium px-2" type="submit">
					Done
				</button>
			</form>
			{formError && <div>{formError}</div>}
			{successMessage && <div>{successMessage}</div>}
		</div>
	);
};

export default EditPantryItem;
