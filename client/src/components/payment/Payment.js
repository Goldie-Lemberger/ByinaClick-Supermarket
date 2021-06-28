import React, { useState } from 'react';
import FormInput from '../newClient/FormInput';
import { isValide } from '../../shared/regex';
import './Payment.css'

import { useHistory } from "react-router-dom";


export default function Payment(props) {
    const [userInfo, setUserInfo] = useState({
        address: { name: JSON.parse(localStorage.user).address, message: "", proper: true },
        phoneNumber: { name: JSON.parse(localStorage.user).phoneNumber, message: "", proper: true },
        lastName: { name: JSON.parse(localStorage.user).lastName, message: "", proper: true },
        firstName: { name: JSON.parse(localStorage.user).firstName, message: "", proper: true },
    })
    let history = useHistory();
    const UpdateValue = (updateValue) => {
        const message_ = isValide(updateValue.target);
        if (message_ === "") {
            setUserInfo({
                ...userInfo,
                [updateValue.target.name]: { name: updateValue.target.value, message: "", proper: updateValue.target.value === "" ? false : true }
            })
        } else {
            if (updateValue.target.value !== "") {
                setUserInfo({
                    ...userInfo,
                    [updateValue.target.name]: { name: updateValue.target.value, message: message_, proper: false }
                })
            }
        }
    }

    const handelSubmit = (event) => {
        event.preventDefault();
        let newDataToUpdate = userInfo
        let checkFormIsCorrect = true;
        Object.keys(newDataToUpdate).forEach((value_) => {
            if (newDataToUpdate[value_].name === "") {
                newDataToUpdate[value_].message = "is required!";
            }
            checkFormIsCorrect &= userInfo[value_].proper;
        })
        setUserInfo({ ...newDataToUpdate });

        if (checkFormIsCorrect) {
            history.push({
                pathname: "./payment/final",
            })
        }
    }

    return (
        <div className="container container_">
            <form className="row g-3" onSubmit={handelSubmit}>

                <h4 className="h4">Shipping Address:</h4>

                <div className="col-12">
                    <FormInput name="address"
                        description="Address"
                        type="text"
                        value={userInfo.address.name}
                        onChange={UpdateValue}
                        errorMessage={userInfo.address.message}
                        placeholder="Etrog 85 Givat Ze'ev" />
                </div>

                <div className="col-12">
                    <FormInput name="phoneNumber"
                        description="Phone Number"
                        type="text"
                        value={userInfo.phoneNumber.name}
                        onChange={UpdateValue}
                        errorMessage={userInfo.phoneNumber.message} />
                </div>

                <div className="col-12">
                    <FormInput name="lastName"
                        description="Last Name"
                        type="text"
                        value={userInfo.lastName.name}
                        onChange={UpdateValue}
                        errorMessage={userInfo.lastName.message}
                        placeholder="" />
                </div>
                <div className="col-12">
                    <FormInput name="firstName"
                        description="First Name"
                        type="text"
                        value={userInfo.firstName.name}
                        onChange={UpdateValue}
                        errorMessage={userInfo.firstName.message}
                        placeholder="" />
                </div>              <div className="col-12">
                    <button type="submit" className="btn btn-dark">Submit</button>
                </div>
            </form>


        </div>
    )
}
