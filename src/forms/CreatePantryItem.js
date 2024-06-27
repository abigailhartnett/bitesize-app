import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Form from "../components/Form";
import TextInput from "../components/inputs/TextInput";
import Select from "../components/inputs/Select";
import Checkbox from "../components/inputs/Checkbox";
import Button from "../components/buttons/Button";

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
		<Form
			onSubmit={handleSubmit}
			successMessage={successMessage}
			formError={formError}
			formTitle="Create Pantry Item"
		>
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
			<Checkbox
				id="onList"
				checked={onList}
				onChange={(e) => setOnList(e.target.checked)}
				forInput="onList"
				label="Add to list"
			/>
			<Button type="submit" variant="primary">
				Create Item
			</Button>
		</Form>
	);
};

export default CreatePantryItem;
