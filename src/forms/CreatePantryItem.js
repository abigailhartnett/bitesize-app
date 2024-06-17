import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Button from "../components/buttons/Button";
import Checkbox from "../components/inputs/Checkbox";

const CreatePantryItem = ({ pantryItems }) => {
	const [name, setName] = useState("");
	const [aisle, setAisle] = useState("");
	const [status, setStatus] = useState("out");
	const [onList, setOnList] = useState(false);
	const [store, setStore] = useState("");
	const [formError, setFormError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");

	const aisleOptions = [
		...new Set(pantryItems?.map((item) => item.aisle || "")),
	]
		.sort((a, b) => a.localeCompare(b))
		.map((aisle, index) => {
			return (
				<option key={index} value={aisle}>
					{aisle}
				</option>
			);
		});

	const storeOptions = [
		<option>costco</option>,
		<option>safeway</option>,
		<option>other</option>,
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !aisle || !status) {
			setFormError("Please fill out all fields");
			return;
		}

		try {
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
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full my-8">
				<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
					<label htmlFor="item" className="text-xs font-semibold">
						Item
					</label>
					<input
						type="text"
						id="item"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="font-semibold capitalize bg-transparent"
					/>
				</div>

				<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
					<label htmlFor="aisle" className="text-xs font-semibold">
						Aisle
					</label>
					<select
						type="text"
						id="aisle"
						value={aisle}
						onChange={(e) => setAisle(e.target.value)}
						className="font-semibold capitalize bg-transparent"
					>
						{aisleOptions}
					</select>
				</div>

				<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
					<label htmlFor="store" className="text-xs font-semibold">
						Store
					</label>
					<select
						type="text"
						id="store"
						value={store}
						onChange={(e) => setStore(e.target.value)}
						className="font-semibold capitalize bg-transparent"
					>
						{storeOptions}
					</select>
				</div>

				<div className="flex flex-col bg-pepper/10 p-4 rounded-2xl">
					<label htmlFor="status" className="text-xs font-semibold">
						Status
					</label>
					<select
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="font-semibold capitalize bg-transparent"
					>
						<option value="out">Out</option>
						<option value="low">Low</option>
						<option value="in stock">In Stock</option>
					</select>
				</div>
				<div className="flex gap-2 items-center">
					<Checkbox
						id="onList"
						checked={onList}
						onChange={(e) => setOnList(e.target.checked)}
					/>
					<label
						for="onList"
						className="font-semibold capitalize bg-transparent"
					>
						Add to list
					</label>
				</div>
				<Button type="submit">Create Item</Button>
			</form>
			{formError && <div>{formError}</div>}
			{successMessage && <div>{successMessage}</div>}
		</div>
	);
};

export default CreatePantryItem;
