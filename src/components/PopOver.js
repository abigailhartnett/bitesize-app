import React from "react";
import { IconButton } from "bitesize-app/components";

const PopOver = ({ children, closePopover }) => {
	return (
		<div className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 bg-white px-4 pb-8 rounded-t-2xl flex-col align-top w-full h-3/4 mt-4 border border-solid border-pepper/20">
			<IconButton
				icon="fa-xmark"
				onClick={closePopover}
				faStyle="fa-solid"
				size="lg"
				className="absolute top-2 text-pepper bg-white rounded-full"
			/>
			<div className="h-full overflow-y-scroll">{children}</div>
		</div>
	);
};

export default PopOver;
