import React from "react";
import Grid from "./Layout/Grid";

const ListView = ({ children, grid, gridGap, gridMinWidth }) => {
	return (
		<div className={`overflow-y-scroll scrollbar-hide mb-[97px] pb-4`}>
			{grid ? (
				<Grid gap={gridGap} minWidth={gridMinWidth}>
					{children}
				</Grid>
			) : (
				<>{children}</>
			)}
		</div>
	);
};

export default ListView;
