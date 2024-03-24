import React from "react";
import { recipes } from "../../data/recipes";
import { pantry } from "../../data/pantry";
import CheckBox from "../CheckBox";

const InstructionStep = ({ id }) => {
	const recipe = recipes.find((recipe) => recipe.id === id);
	const ingredient = pantry.find((ingredient) => ingredient);

	const contents = recipe.steps.map((step) => {
		return (
			<div
				key={step.id}
				className="border-2 border-solid border-gray-100 p-4 my-8"
			>
				{/* <div className="font-semibold pb-4">Step {step.id}</div> */}

				<div>
					<div className="font-semibold">{step.instruction}</div>
					{step.ingredients.length > 0 && (
						<div className="grid-flow-row grid grid-cols-2 gap-2 pt-4">
							{step.ingredients.map((ingredient) => {
								const pantryItem = pantry.find(
									(item) => item.name === ingredient.name
								);
								if (pantryItem) {
									return (
										<div key={ingredient.id}>
											<div className="flex my-1 items-top">
												<CheckBox />
												<div>
													<div className="">{ingredient.name}</div>
													<div className="text-xs">{ingredient.quantity}</div>
												</div>
											</div>
										</div>
									);
								}
								return;
							})}
						</div>
					)}
				</div>
			</div>
		);
	});

	return <div>{contents}</div>;
};

export default InstructionStep;
