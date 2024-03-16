import React from "react";
import "./tag.css";

const Tag = ({ label }) => {
	const classes = `tag tag--${label.replace(" ", "-").toLowerCase()} text-xs`;
	return <div className={classes}>{label}</div>;
};

export default Tag;
