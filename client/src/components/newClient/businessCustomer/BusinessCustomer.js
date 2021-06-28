import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { isValide } from '../../../shared/regex';
import FormInput from '../FormInput'
import './BusinessCustomer.css';

export default function BusinessCustomer(props) {

    let history = useHistory();
    const [newUser, setNewUser] = useState({
        company: { name: "", message: "", proper: false },
        employees: { name: "", message: "", proper: false },
        typeBusiness: { name: "", message: "", proper: false },
        lastName: { name: "", message: "", proper: false },
        firstName: { name: "", message: "", proper: false }
    })
    const [checkBox_, setCheckBox_] = useState(false);
    const [errorMessege, setErorMessege] = useState("");

    const UpdateValue = (updateValue) => {
        const message_ = isValide(updateValue.target);
        if (message_ === "") {
            setNewUser({
                ...newUser,
                [updateValue.target.name]: { name: updateValue.target.value, message: "", proper: updateValue.target.value === "" ? false : true }
            })
        } else {
            if (updateValue.target.value !== "") {
                setNewUser({
                    ...newUser,
                    [updateValue.target.name]: { name: updateValue.target.value, message: message_, proper: false }
                })
            }
        }
    }

    const handelSubmit = (event) => {
        event.preventDefault();
        let newDataToUpdate = newUser
        let checkFormIsCorrect = true;
        Object.keys(newDataToUpdate).forEach((value_) => {
            if (newDataToUpdate[value_].name === "") {
                newDataToUpdate[value_].message = "is required!";
            }
            checkFormIsCorrect &= newUser[value_].proper;
        })
        setNewUser({ ...newDataToUpdate });
        if (checkBox_ === false) {
            setErorMessege("You must agree before submitting.")
        } else {
            setErorMessege("")
        }
        if (checkFormIsCorrect && checkBox_) {
            history.push({
                pathname: "./../newClient",
                state: {
                    companyBusiness: newUser.company.name,
                    employeesBusiness: newUser.employees.name,
                    typeBusiness: newUser.typeBusiness.name,
                    lastNameBusiness: newUser.lastName.name,
                    firstNameBusiness: newUser.firstName.name,
                    type: "BusinessCustomer",
                    registration: true
                }
            })
        }
    }

  
    return (
        <div>
            <div className="container container_">
                <form className="row g-4 needs-validation" noValidate onSubmit={handelSubmit}>
      
                    <div className="col-md-12">
                        <FormInput name="company"
                            description="Company / business name"
                            type="text"
                            value={newUser.company.name}
                            onChange={UpdateValue}
                            errorMessage={newUser.company.message} />
                    </div>

                    <div className="col-md-12">
                        <FormInput name="employees"
                            description="number of employees"
                            type="number"
                            value={newUser.employees.name}
                            onChange={UpdateValue}
                            errorMessage={newUser.employees.message} />
                    </div>

                    <div className="col-md-12">
                        <FormInput name="typeBusiness"
                            description="Type Business"
                            type="text"
                            value={newUser.typeBusiness.name}
                            onChange={UpdateValue}
                            errorMessage={newUser.typeBusiness.message} />
                    </div>

                    <div className="col-md-12">
                        <FormInput name="firstName"
                            description="First Name"
                            type="text"
                            value={newUser.firstName.name}
                            onChange={UpdateValue}
                            errorMessage={newUser.firstName.message} />
                    </div>
                

                    <div className="col-md-12">
                        <FormInput name="lastName"
                            description="last Name"
                            type="text"
                            value={newUser.lastName.name}
                            onChange={UpdateValue}
                            errorMessage={newUser.lastName.message} />
                    </div>

                    <div className="center">
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" onChange={() => { setCheckBox_(!checkBox_); }} />
                                <label className="form-check-label" htmlFor="invalidCheck">
                                    Agree to </label>
                                <small className="terms-modal" href="" onClick={() => props.setShowAbout(true)}> terms and conditions</small>
                                <div >
                                    {errorMessege}</div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-dark" type="submit">Continue registration</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
