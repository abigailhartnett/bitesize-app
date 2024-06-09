import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Button from "../components/buttons/Button";

const EditPantryItem = ({
	currentItem,
	setCurrentItem,
	pantryItems,
	setEditing,
	editing,
	setPopoverIsOpen,
}) => {
	const [name, setName] = useState(currentItem?.name);
	const [aisle, setAisle] = useState(currentItem?.aisle);
	const [status, setStatus] = useState(currentItem?.status);
	const [store, setStore] = useState(currentItem?.store);
	const [onList, setOnList] = useState(false);
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

	const fetchEntries = async () => {
		const { data, error } = await supabase
			.from("pantry")
			.select("*")
			.eq("name", currentItem?.name);

		if (error) {
			console.error("Error fetching pantry items:", error);
		} else {
			setCurrentItem(data);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { error } = await supabase
				.from("pantry")
				.update([{ name: name, aisle: aisle, status: status, store: store }])
				.eq("name", currentItem?.name);

			if (error) {
				setFormError("Could not add item");
				setSuccessMessage(null);
				console.log(error);
			} else {
				console.log("woohoo updated", [{ name, aisle, status, store }]);
				setFormError(null);
				setSuccessMessage(`🙌🏻 Updated ${name}`);
			}
		} catch (error) {
			setSuccessMessage(null);
			setFormError("Could not add item");
			console.error("Error adding item:", error);
		}

		fetchEntries();
		editing && setEditing(false);
		setPopoverIsOpen(false);
	};

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-center text-lg font-bold">Edit</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				{/* <div className="flex gap-4"> */}
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="aisle">Aisle</label>
				<select
					type="text"
					id="aisle"
					value={aisle}
					onChange={(e) => setAisle(e.target.value)}
				>
					{aisleOptions}
				</select>
				<label htmlFor="status">Status</label>
				<select
					id="status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value="out">Out</option>
					<option value="low">Low</option>
					<option value="in stock">In Stock</option>
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
				<Button type="submit">Update item</Button>
			</form>
			{formError && <div>{formError}</div>}
			{successMessage && <div>{successMessage}</div>}
		</div>
	);
};

export default EditPantryItem;
