import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function CustomFormInput({ icon, type = "text", name = "", placeholder = "", inputValue = "", onChange }) {
    return (
        <div className="input-comp">
            <FontAwesomeIcon icon={icon} />
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 
                value={inputValue} 
            />
        </div>
    );
}
export default CustomFormInput;