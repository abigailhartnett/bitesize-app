import { useCallback } from "react";

export const useFormattedText = () => {
	const formattedText = useCallback((text) => {
		const paragraphs = text?.split("\n")?.filter((text) => text.trim() !== "");
		return paragraphs?.map((text, index) => (
			<div key={index}>
				<p>{text}</p>
				<br />
			</div>
		));
	}, []);

	return { formattedText };
};
