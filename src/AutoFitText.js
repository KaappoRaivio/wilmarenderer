import React, { useEffect, useReducer, useRef } from "react";

const reducer = (state, { fontSize, executing }) => {
	return { ...state, fontSize, executing };
};

const AutoFitText = ({ initialFontSize, children, className, onFontSizeFound, uniformFontSize }) => {
	const targetContainer = useRef(React.createRef());
	const actualContainer = useRef(React.createRef());

	const [{ fontSize, executing }, dispatch] = useReducer(reducer, { fontSize: initialFontSize, executing: true });
	useEffect(() => {
		const target = targetContainer.current;
		const actual = actualContainer.current;

		if (actual && target && executing && !uniformFontSize) {
			let offset = target.offsetHeight - actual.offsetHeight;
			if (offset < 0) {
				dispatch({ fontSize: Math.max(fontSize - 0.5, 0), executing: true });
			} else {
				dispatch({ executing: false });
				onFontSizeFound(fontSize);
			}
		}
	}, [executing, fontSize, onFontSizeFound, uniformFontSize]);
	return (
		<div
			style={{
				visibility: executing ? "hidden" : "visible",
				fontSize: `${uniformFontSize || fontSize}px`,
				// fontSize: `${fontSize}px`,
			}}
			className={className}
			ref={targetContainer}>
			<span ref={actualContainer}>{children}</span>
		</div>
	);
};

AutoFitText.propTypes = {};

export default AutoFitText;
