import React, { useEffect, useRef } from "react";
import { IconButton } from "bitesize-app/components";

const PopOver = ({ children, closePopover }) => {
	const popoverRef = useRef(null);

	useEffect(() => {
		const handlePressOutside = (event) => {
			if (popoverRef.current && !popoverRef.current.contains(event.target)) {
				closePopover();
			}
		};

		document.addEventListener("mousedown", handlePressOutside);
		document.addEventListener("touchstart", handlePressOutside);

		return () => {
			document.removeEventListener("mousedown", handlePressOutside);
			document.removeEventListener("touchstart", handlePressOutside);
		};
	}, [closePopover]);

	return (
		<div className="fixed inset-0 z-20">
			{/* Overlay */}
			<div className="absolute inset-0 flex items-center justify-center bg-pepper/50">
				{/* Popover */}
				<div
					ref={popoverRef}
					className="relative bg-white p-4 rounded-2xl w-full max-w-lg max-h-[calc(100vh-4rem)] shadow-lg m-4"
				>
					<div className="sticky flex justify-end z-10">
						<IconButton
							icon="fa-xmark"
							onClick={closePopover}
							faStyle="fa-solid"
							size="lg"
							className="text-pepper bg-white rounded-full"
						/>
					</div>
					<div className="overflow-y-scroll max-h-[calc(100vh-8rem)]">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopOver;
