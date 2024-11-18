import React from "react";

function FormBtns({ mainActionName, otherActionName, otherActionOnClick }) {
	return (
		<div className="buttons">
			<div className="buttons-top buttons-part">
				<button type="submit" className="button--good">
					{mainActionName}
				</button>
			</div>

			<div className="buttons-bottom buttons-part">
				<button type="button" className="button--bad" onClick={() => otherActionOnClick()}>
					{otherActionName}
				</button>
			</div>
		</div>
	);
}
export default FormBtns;
