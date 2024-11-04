import React from "react";

function FormBtns({mainActionName, otherActionName, otherActionOnClick}) {
	return (
		<div className="buttons">
			<button type="submit" className="buttons-good">{mainActionName}</button>
			<button type="button" className="buttons-bad" onClick={() => otherActionOnClick()}>{otherActionName}</button>
		</div>
	);
}
export default FormBtns;
