import React from "react";
import { recipes } from "../../data/recipes";
import CheckBox from "../CheckBox";

const InstructionStep = ({ id }) => {
	const recipe = recipes.find((recipe) => recipe.id === id);

	const contents = recipe.steps.map((step) => {
		return (
			<div
				key={step.id}
				className="pt-8 border-2 border-solid border-black p-4 my-4"
			>
				<div className="font-semibold pb-4">Step {step.id}</div>

				<div className="flex">
					<div className="w-1/2">
						{step.ingredients.map((ingredient) => {
							return (
								<div key={ingredient.id}>
									<div className="flex items-center">
										<CheckBox />
										<div>
											<div className="text-xs">{ingredient.quantity}</div>
											<div className="pb-2">{ingredient.name}</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div>{step.instruction}</div>
				</div>
			</div>
		);
	});

	return <div>{contents}</div>;
};

export default InstructionStep;
