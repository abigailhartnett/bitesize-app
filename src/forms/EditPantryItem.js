import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import IconButton from "../components/buttons/IconButton";

const EditPantryItem = ({
	currentItem,
	setCurrentItem,
	pantryItems,
	setPantryItems,
	setEditing,
	editing,
	setPopoverIsOpen,
}) => {
	const [name, setName] = useState(currentItem?.name);
	const [aisle, setAisle] = useState(currentItem?.aisle);
	const [status, setStatus] = useState(currentItem?.status);
	const [store, setStore] = useState(currentItem?.store);
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
				.update([
					{
						name: name,
						aisle: aisle,
						status: status,
						store: store,
					},
				])
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
		<div>
			<h2 className="text-center text-lg font-bold my-4">Edit Item</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full my-8">
				<IconButton
					icon="fa-check"
					type="submit"
					faStyle="fa-solid"
					size="lg"
					className="absolute top-2 right-4 text-pepper"
				/>

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
			</form>
			{formError && <div>{formError}</div>}
			{successMessage && <div>{successMessage}</div>}
		</div>
	);
};

export default EditPantryItem;
