import React from "react";

const PopOver = ({
	setPopoverIsOpen,
	toggleShoppingList,
	removeItemFromList,
	currentItem,
}) => {
	const closePopOver = () => {
		setPopoverIsOpen(false);
	};

	return (
		<div>
			<div className="fixed inset-0 bg-black bg-opacity-50 z-10">
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg flex-col align-top">
					<button onClick={closePopOver} className="absolute top-2 right-4">
						<span class="material-symbols-outlined text-sm font-bold">
							close
						</span>
					</button>

					<div className="my-4">
						<button
							className="font-semibold flex gap-2"
							onClick={() => removeItemFromList(currentItem.id)}
						>
							<span>{currentItem.name}</span>
							<span class="material-symbols-outlined text-sm">edit</span>
						</button>
					</div>
					<div>
						{/* <div>Related Recipes</div> */}

						{currentItem.onList && toggleShoppingList && (
							<button
								className="bg-pepper text-salt p-2"
								onClick={removeItemFromList}
							>
								Remove from list
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopOver;
