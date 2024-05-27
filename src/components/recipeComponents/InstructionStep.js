import React from "react";
import { recipes } from "../../data/recipes";
import { pantry } from "../../data/pantry";
import CheckBox from "../CheckBox";

const InstructionStep = ({ id, pantryItems }) => {
	const recipe = recipes.find((recipe) => recipe.id === id);

	// const ingredient = pantry.find((ingredient) => ingredient);

	const contents = recipe.steps.map((step) => {
		return (
			<div className="mt-4">
				<span class="font-dancingscript text-2xl font-bold">
					{step.summary}
				</span>
				<div
					key={step.id}
					className="border border-solid border-pepper p-4 mb-8 bg-white"
				>
					{/* <div className="font-semibold pb-4">Step {step.id}</div> */}

					<div>
						<div>{step.instruction}</div>
						{step.ingredients.length > 0 && (
							<div>
								<hr className="border-b border-t-0 border-solid border-pepper border-opacity-10 pt-3" />
								<div className="grid-flow-row grid grid-cols-2 gap-2 pt-4">
									{step.ingredients.map((ingredient) => {
										const pantryItem = pantryItems.find(
											(item) => item.name === ingredient.name
										);
										{
											console.log(pantryItem);
										}
										if (pantryItem) {
											return (
												<div key={ingredient.id}>
													<div className="flex flex-col">
														<CheckBox
															label={ingredient.name}
															id={ingredient.name}
														/>
														<div className="text-sm">{ingredient.quantity}</div>
													</div>
												</div>
											);
										}
										return <></>;
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	});

	return <div>{contents}</div>;
};

export default InstructionStep;
