import React from 'react'
import './FormInput.css'
export default function FormInput(props) {
    const { name, description, type, value, onChange, errorMessage, placeholder } = props;
    return (
        <div>
            <label htmlFor={name} className="form-label_" >{description}</label>
            <input type={type} className=" form-control_" id={name} name={name} value={value} onChange={onChange} placeholder={placeholder}></input>
            <small className="smallErorr">{errorMessage}</small>
        </div>
    )
}
FormInput.defaultProps = {
    type: "text",
    value: "",
    errorMessage: "",
    placeholder: ""
}