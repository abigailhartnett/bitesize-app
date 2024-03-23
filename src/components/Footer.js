import React from "react";
import Search from "./Search";

const Footer = ({ searchPlaceholder }) => {
	return (
		<div className="bg-gray-200 p-10 mt-4 fixed inset-x-0 bottom-0">
			<div className="flex justify-center">
				<Search placeholder={searchPlaceholder} />
			</div>
		</div>
	);
};

export default Footer;
