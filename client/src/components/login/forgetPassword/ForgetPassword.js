import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import emailjs from 'emailjs-com';
import { isValide } from '../../../shared/regex.js'
import { getUser, updateUser ,getUserToReset} from '../../../service/UsersService'
import { Accordion, Card } from 'react-bootstrap'
import { getCart } from '../../../service/CartService.js';

export default function ForgetPassword(props) {
    const [passwordRecovery, setPasswordRecovery] = useState({
        id: { name: "", message: "", proper: false },
        userEmail: { name: "", message: "", proper: false },
        password: { name: "", message: "", proper: true }
    });
    const [code_, setCode_] = useState(0);
    const [getCode, setGetCode] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [insertCode, setInsertCode] = useState({ name: "", message: "", proper: false });

    // const randomCode = () => { return Math.floor(Math.random() * 10000) + 1000; };

    // const existUser = async () => {
    //     let user = await getUserToReset(passwordRecovery.id.name);
    //     if (Object.keys(user).length === 0) {
    //         return false
    //     } else {
    //         return true;
    //     }
    // }

    const changePassword = async () => {
        let newDataToUpdate = passwordRecovery;
        let checkFormIsCorrect = true;
        Object.keys(newDataToUpdate).forEach((value_) => {
            if (newDataToUpdate[value_].name === "") {
                newDataToUpdate[value_].message = "is required!";
            }
            checkFormIsCorrect &= passwordRecovery[value_].proper;
        })

        if (checkFormIsCorrect) {
            const codeee = await getUserToReset(passwordRecovery.id.name);
            if (codeee != 0) {
                setCode_(codeee);
                setGetCode(true);
              
            } else {
                props.setIsRegistered(1);
            }
        }

    }
    const checkCode = () => {
        if (insertCode.name == code_) {
            setNewPassword(true);
            setInsertCode({ name: "", message: "", proper: true })
            setPasswordRecovery({
                ...passwordRecovery,
                password: { name: "", message: "", proper: passwordRecovery.password.proper === false }
            })
        } else {
            setInsertCode({ name: "", message: "The code entered is incorrect", proper: false })
        }
    }
    const finishChangePassword = async () => {
        let existUser = await getUser(passwordRecovery.id.name);
        let existCart = await getCart(passwordRecovery.id.name);
        if (Object.keys(existUser).length !== 0) {
            updateUser({ ...existUser, password: passwordRecovery.password.name });
            props.changeUser({ ...existUser, password: passwordRecovery.password.name }, existCart)
            props.handleClose();
        }
    }

    const UpdateValue = (updateValue) => {
        const message_ = isValide(updateValue.target);
        if (message_ === "") {
            setPasswordRecovery({
                ...passwordRecovery,
                [updateValue.target.name]: { name: updateValue.target.value, message: "", proper: updateValue.target.value === "" ? false : true }
            })
        } else {
            if (updateValue.target.value !== "") {
                setPasswordRecovery({
                    ...passwordRecovery,
                    [updateValue.target.name]: { name: updateValue.target.value, message: message_, proper: false }
                })
            }
        }
    }


    return (
        <div>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <Modal.Body className="row">
                        <div className="col-md-6">
                            <label htmlFor="id" />
                            <input type="text"
                                className="form-control"
                                id="id"
                                name="id"
                                placeholder="ID"
                                onChange={UpdateValue}
                                value={passwordRecovery.id.name} />
                            <small className="smallErorr">{passwordRecovery.id.message}</small>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="userEmail" />
                            <input type="text"
                                className="form-control"
                                id="userEmail"
                                placeholder="Email"
                                name="userEmail"
                                value={passwordRecovery.userEmail.name}
                                onChange={UpdateValue} />
                            <small className="smallErorr">{passwordRecovery.userEmail.message}</small>
                        </div>
                        <p style={{ textAlign: "center", paddingTop: "3" }}>   Enter email to reset password</p>
                        {
                            (getCode && !newPassword) && <div className="col-md-6">
                                <label htmlFor="code" />
                                <input type="text"
                                    className="form-control"
                                    id="code"
                                    placeholder="Code"
                                    name="code"
                                    value={insertCode.name}
                                    onChange={(e) => { setInsertCode({ ...insertCode, name: e.target.value }) }} />
                                <small className="smallErorr">{insertCode.message}</small>
                            </div>
                        } {newPassword && <div className="col-md-12">
                            <label htmlFor="password" />
                            <input type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={passwordRecovery.password.name}
                                onChange={UpdateValue} />
                            <small className="smallErorr">{passwordRecovery.password.message}</small>
                        </div>}

                    </Modal.Body>
                    <Modal.Footer>
                        {!getCode && <Button variant="secondary" onClick={changePassword}>
                            sent me a code</Button>}
                        {(getCode && !newPassword) && <Button variant="secondary" onClick={checkCode}>
                            Submit</Button>}
                        {newPassword && <Button variant="secondary" onClick={finishChangePassword}>
                            Change Password</Button>}
                    </Modal.Footer>
                    {(props.isRegistered === 1) && <div>
                        <Modal.Body>You have not registered yet </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>
                                Close</Button>
                            <Button variant="primary" onClick={() => { props.signUp(); props.handleClose(); }}>
                                sign Up</Button>
                            <Button variant="warning" onClick={() => { props.goBack(); }}>
                                Go Back</Button>
                        </Modal.Footer>
                    </div>}
                </Card.Body>
            </Accordion.Collapse>
        </div>)
}
