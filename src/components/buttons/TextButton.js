import React from "react";
import { Link } from "react-router-dom";

const TextButton = ({ text }) => {
	return <Link className="font-semibold">{text}</Link>;
};

export default TextButton;
