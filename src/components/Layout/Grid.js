const Grid = ({ gap = 1, children, minWidth = 200 }) => {
	//   Use `aspect-square` on child items to be sure they're all square

	return (
		<div
			className={`w-full`}
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
				gap: `${gap}rem`,
			}}
		>
			{children}
		</div>
	);
};

export default Grid;
