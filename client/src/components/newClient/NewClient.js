import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { isValide } from '../../shared/regex.js'
import FormInput from './FormInput.js';
import "./NewClient.css";
import { addUser } from '../../service/UsersService'
import Button from 'react-bootstrap/Button';

export default function NewClient(props) {

    let history = useHistory();

    const { lastNamePrivate, firstNamePrivate, companyBusiness,
        employeesBusiness,
        typeBusiness,
        lastNameBusiness,
        firstNameBusiness,
        type,
        registration } =
        (props.location && props.location.state) || { registration: false };

    const [newUser, setNewUser] = useState({
        userEmail: { name: "", message: "", proper: false },
        id: { name: "", message: "", proper: false },
        address: { name: "", message: "", proper: false },
        phoneNumber: { name: "", message: "", proper: false },
        password: { name: "", message: "", proper: false }
    })
    const [isLoading, setIsLoading] = useState(false);

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
 
    const handelSubmit = async (event) => {
        setIsLoading(true);
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
        let newUserToJson;
        if (checkFormIsCorrect) {

            let checkPost = false

            if (type === "PrivateCustomer") {
                newUserToJson = {
                    id: newUser.id.name,
                    lastName: lastNamePrivate,
                    firstName: firstNamePrivate,
                    userEmail: newUser.userEmail.name,
                    address: newUser.address.name,
                    phoneNumber: newUser.phoneNumber.name,
                    password: newUser.password.name,
                    type: type,
                    totalPrice:50
                }
                checkPost = await addUser(newUserToJson);

            }
            else {
                newUserToJson = {
                    id: newUser.id.name,
                    companyBusiness: companyBusiness,
                    employeesBusiness: employeesBusiness,
                    typeBusiness: typeBusiness,
                    lastName: lastNameBusiness,
                    firstName: firstNameBusiness,
                    userEmail: newUser.userEmail.name,
                    address: newUser.address.name,
                    phoneNumber: newUser.phoneNumber.name,
                    password: newUser.password.name,
                    type: type,
                    totalPrice:20
                }
                checkPost = await addUser(newUserToJson);

            }
            if (!checkPost) {
                props.setShow(true);
            } else {
                props.changeUser(newUserToJson, { id: newUser.id.name, cart: [], totalPrice: (type === "PrivateCustomer" ? 50 : 20) });

                history.push('/');
            }
        }
        setIsLoading(false);
    }
    const goToBusiness = () => {
        history.push('/newClient/businessCustomer')
    }
    const goToPrivate = () => {
        history.push('/newClient/privateCustomer')
    }
    return (
        <div>
            {
                !registration &&
                <div className="marge-top">
                    <div className=" row justify-content-md-center">
                        <Button variant="dark" size="lg" block className="col-5" onClick={goToBusiness}>
                            Business Customer</Button>
                    </div><br /><div className=" row justify-content-md-center">
                        <Button variant="dark" size="lg" block className="col-5" onClick={goToPrivate}>
                            Private Customer  </Button>
                    </div>
                </div>
            }
            <div>
                {
                    registration &&
                    <div className="container container_" >
                        <form className="row g-3" onSubmit={handelSubmit}>
                            <h4 className="h4">Login Details:</h4>
                            <div className="col-12">
                                <FormInput name="userEmail"
                                    description="user Email"
                                    type="text"
                                    value={newUser.userEmail.name}
                                    onChange={UpdateValue}
                                    errorMessage={newUser.userEmail.message}
                                    placeholder="@gmail.com" />
                            </div>
                            <div className="col-12">
                                <FormInput name="id"
                                    description="ID"
                                    type="text"
                                    value={newUser.id.name}
                                    onChange={UpdateValue}
                                    errorMessage={newUser.id.message} />
                            </div>
                            <div className="col-12">
                                <FormInput name="password"
                                    description="password"
                                    type="password"
                                    placeholder="Password"
                                    value={newUser.password.name}
                                    onChange={UpdateValue}
                                    errorMessage={newUser.password.message} />‏

                            </div>
                            <h4 className="h4">Shipping Address:</h4>

                            <div className="col-12">
                                <FormInput name="address"
                                    description="Address"
                                    type="text"
                                    value={newUser.address.name}
                                    onChange={UpdateValue}
                                    errorMessage={newUser.address.message}
                                    placeholder="Etrog 85 Givat Ze'ev" />
                            </div>

                            <div className="col-12">
                                <FormInput name="phoneNumber"
                                    description="Phone Number"
                                    type="text"
                                    value={newUser.phoneNumber.name}
                                    onChange={UpdateValue}
                                    errorMessage={newUser.phoneNumber.message} />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">{isLoading ? 'Loading...' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}