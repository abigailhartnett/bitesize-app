import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import Form from "../components/Form";
import TextInput from "../components/inputs/TextInput";
import Select from "../components/inputs/Select";
import Button from "../components/buttons/Button";
import TextButton from "../components/buttons/TextButton";
import PopOver from "../components/PopOver";

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
	const [warningIsOpen, setWarningIsOpen] = useState(false);

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

	const deleteItem = async (id) => {
		const { error } = await supabase.from("pantry").delete().match({ id: id });

		if (error) {
			console.error("Error deleting item", error);
			return;
		}
		setWarningIsOpen(false);
		setPopoverIsOpen(false);
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
	};

	return (
		<div>
			{warningIsOpen && (
				<PopOver setPopoverIsOpen={setWarningIsOpen}>
					<div className="text-center flex flex-col gap-2">
						<div>Are you sure you want to delete this item?</div>
						<Button
							onClick={() => deleteItem(currentItem?.id)}
							className="bg-tomato"
						>
							Yes
						</Button>
						<Button onClick={() => setWarningIsOpen(false)}>No</Button>
					</div>
				</PopOver>
			)}
			<Form
				onSubmit={handleSubmit}
				successMessage={successMessage}
				formError={formError}
				formTitle="Edit Pantry Item"
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
				<div>
					<i class="fa-solid fa-warning text-tomato mx-2" />{" "}
					<TextButton
						type="button"
						className="text-tomato"
						onClick={() => setWarningIsOpen(true)}
					>
						Delete Pantry Item
					</TextButton>
				</div>
				<Button variant="primary" type="submit">
					Done
				</Button>
			</Form>
		</div>
	);
};

export default EditPantryItem;
