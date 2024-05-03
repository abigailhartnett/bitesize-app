import React, { useState } from "react";
import supabase from "../config/supabaseClient";

const CreatePantryItem = () => {
	const [name, setName] = useState("");
	const [aisle, setAisle] = useState("");
	const [status, setStatus] = useState("in stock");
	const [onList, setOnList] = useState(false);
	const [store, setStore] = useState("");
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
				.insert([{ name, aisle, status, onList, store }]);

			if (error) {
				setFormError("Could not add item");
				setSuccessMessage(null);
				console.log(error);
			} else {
				console.log([{ name, aisle, status }]);
				setFormError(null);
				setSuccessMessage(`🙌🏻 Added ${name} to pantry!`);

				// Reset form
				setName("");
				setAisle("");
				setStatus("out");
				setOnList(false);
				setStore("");
			}
		} catch (error) {
			setSuccessMessage(null);
			setFormError("Could not add item");
			console.error("Error adding item:", error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="aisle">Aisle</label>
				<input
					type="text"
					id="aisle"
					value={aisle}
					onChange={(e) => setAisle(e.target.value)}
				/>
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
				<div className="flex gap-4">
					<input
						id="onList"
						type="checkbox"
						checked={onList}
						onChange={(e) => setOnList(e.target.checked)}
					/>
					<label for="onList">Add to list</label>
				</div>
				<div className="flex gap-4" onChange={(e) => setStore(e.target.value)}>
					<input
						type="radio"
						value="costco"
						name="store"
						checked={store === "costco"}
					/>
					<label htmlFor="costco">Costco</label>

					<input
						type="radio"
						value="safeway"
						name="store"
						checked={store === "safeway"}
					/>
					<label htmlFor="safeway">Safeway</label>

					<input
						type="radio"
						value="other"
						name="store"
						checked={store === "other"}
					/>
					<label htmlFor="other">Other</label>
				</div>
				<button className="bg-pepper text-salt" type="submit">
					Add Item
				</button>
			</form>
			{formError && <div>{formError}</div>}
			{successMessage && <div>{successMessage}</div>}
		</div>
	);
};

export default CreatePantryItem;
