import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Button from "../components/buttons/Button";
import Checkbox from "../components/inputs/Checkbox";
import Select from "../components/inputs/Select";
import TextInput from "../components/inputs/TextInput";

const CreatePantryItem = ({ pantryItems }) => {
	const [name, setName] = useState("");
	const [aisle, setAisle] = useState("");
	const [status, setStatus] = useState("");
	const [onList, setOnList] = useState(false);
	const [store, setStore] = useState("");
	const [formError, setFormError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");

	const aisles = [
		...new Set(
			pantryItems?.map((item) => item?.aisle?.trim().toLowerCase() || "")
		),
	].sort((a, b) => a.localeCompare(b));

	const stores = [
		...new Set(
			pantryItems?.map((item) => item?.store?.trim().toLowerCase() || "")
		),
	].sort((a, b) => a.localeCompare(b));

	const statuses = [
		...new Set(
			pantryItems?.map((item) => item?.status?.trim().toLowerCase() || "")
		),
	].sort((a, b) => a.localeCompare(b));

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
				setStatus("");
				setOnList(null);
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
				<TextInput
					label="Item"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Select
					label="Aisle"
					options={aisles}
					value={aisle}
					onChange={(e) => setAisle(e.target.value)}
				/>
				<Select
					label="Store"
					options={stores}
					value={store}
					onChange={(e) => setStore(e.target.value)}
				/>
				<Select
					label="Status"
					options={statuses}
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				/>

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
