import React from "react";
import CustomFormInput from "./components/CusTomFormInput";

const FormInputs = ({ baseInputs, signupInputs, crrPage, handleInputChange, inputValue, errors }) => {
	const renderInputs = (inputs) => (
		<>
			{inputs.map((input, index) => (
				<React.Fragment key={index}>
					<CustomFormInput
						icon={input.icon}
						type={input.type}
						name={input.name}
						placeholder={input.placeholder}
						onChange={handleInputChange}
						inputValue={inputValue[input?.name]}
					/>
					{input.error && <p className="inputs-error">{input.error}</p>}
				</React.Fragment>
			))}
		</>
	);

	return (
		<div className="inputs">
			{renderInputs(baseInputs)}
			{crrPage === "signup" && renderInputs(signupInputs)}
		</div>
	);
};

export default FormInputs;