import React from "react";
import { recipes } from "../../data/recipes";
import CheckBox from "../CheckBox";

const InstructionStep = ({ id }) => {
	const recipe = recipes.find((recipe) => recipe.id === id);

	const contents = recipe.steps.map((step) => {
		return (
			<div
				key={step.id}
				className="border-2 border-solid border-gray-100 p-4 my-8"
			>
				{/* <div className="font-semibold pb-4">Step {step.id}</div> */}

				<div>
					<div className="font-semibold">{step.instruction}</div>
					<div className="grid-flow-row grid grid-cols-2 gap-2 pt-4">
						{step.ingredients.map((ingredient) => {
							return (
								<div key={ingredient.id}>
									<div className="flex my-1 items-end">
										<CheckBox />
										<div>
											<div className="text-xs">{ingredient.quantity}</div>
											<div className="">{ingredient.name}</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	});

	return <div>{contents}</div>;
};

export default InstructionStep;
