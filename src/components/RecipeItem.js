import React from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";

const RecipeItem = ({ item }) => {
	return (
		<Link
			to={`/recipes/${item.slug}`}
			className="rounded-2xl w-full h-full pb-4  bg-white shadow-md hover:shadow-lg"
		>
			<span
				className={`text-xs capitalize font-semibold ${item.status === "not planned" ? "text-pepper/40" : "text-broccoli"}`}
			></span>

			<div className="relative h-full flex flex-col justify-between">
				<Tag
					size="xs"
					color={item.status === "not planned" ? "default" : "green"}
					label={item.status}
					className="absolute top-2 left-2"
				/>
				<img
					src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
					alt="final recipe"
					className="h-40 overflow-hidden rounded-tl-2xl rounded-tr-2xl object-cover"
				/>

				<span className="h-fit mx-2 py-2 font-semibold capitalize line-clamp-2">
					{item.title}
				</span>
			</div>
		</Link>
	);
};

export default RecipeItem;
