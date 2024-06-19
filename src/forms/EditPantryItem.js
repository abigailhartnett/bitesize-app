import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import IconButton from "../components/buttons/IconButton";
import Form from "../components/Form";
import TextInput from "../components/inputs/TextInput";
import Select from "../components/inputs/Select";

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
			<Form
				onSubmit={handleSubmit}
				successMessage={successMessage}
				formError={formError}
			>
				<IconButton
					icon="fa-check"
					type="submit"
					faStyle="fa-solid"
					size="lg"
					className="absolute top-2 right-4 text-pepper"
				/>
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
			</Form>
		</div>
	);
};

export default EditPantryItem;
