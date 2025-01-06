import supabase from "../config/supabaseClient";

export const useToggle = (currentRecipe, setCurrentRecipe, slug) => {
	const togglePlanned = async () => {
		const newStatus =
			currentRecipe?.status === "planned" ? "not planned" : "planned";
		setCurrentRecipe((prevItem) => ({ ...prevItem, status: newStatus }));

		try {
			await supabase
				.from("recipes")
				.update({ status: newStatus })
				.eq("slug", slug);
		} catch (error) {
			console.error("Error adding recipe to meal plan:", error);
			setCurrentRecipe((prevItem) => ({
				...prevItem,
				status: currentRecipe?.status,
			}));
		}
	};

	return { togglePlanned };
};
