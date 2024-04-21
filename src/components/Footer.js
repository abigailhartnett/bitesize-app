import React from "react";
import Search from "./Search";

const Footer = ({
	pantryItems,
	searchPlaceholder,
	searchFilter,
	setSearchFilter,
	searchQuery,
	setSearchQuery,
}) => {
	return (
		<div className="bg-gray-200 p-10 mt-4">
			<div className="flex justify-center">
				<Search
					placeholder={searchPlaceholder}
					searchFilter={searchFilter}
					setSearchFilter={setSearchFilter}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					pantryItems={pantryItems}
				/>
			</div>
		</div>
	);
};

export default Footer;
