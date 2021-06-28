import React, { useState, useEffect } from 'react'
import './Login.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getUser } from '../../service/UsersService';
import { useHistory } from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion'
import IconButton from "@material-ui/core/IconButton";
import Card from 'react-bootstrap/Card'
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

import ForgetPassword from './forgetPassword/ForgetPassword';
import { getCart } from '../../service/CartService';


export default function Login(props) {


    const [user, setUser] = useState({ id: "", userName: "", password: "" })
    const [submit, setSubmit] = useState(false);
    const [isRegistered, setIsRegistered] = useState(0);
    const [values, setValues] = useState({ password: "", showPassword: false, });

    let history = useHistory();

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setUser({ ...user, password: event.target.value })
    };



    const signUp = () => { history.push({ pathname: "./../newClient", }) }
    const goBack = () => { setIsRegistered(0); }


    const saveChange = async () => {
        console.log("hi")

        let existUser = await getUser(user.id);
        let existCart = await getCart(user.id);
        if (Object.keys(existUser).length === 0) {
            setIsRegistered(1);
        } else {
            if (existUser.userEmail === user.userName && existUser.password === user.password) {
                setSubmit(true);
                props.changeUser(existUser, existCart);
            } else {
                setIsRegistered(2);
            }
        }
    }

    useEffect(() => {
        if (submit === true) {
            setSubmit(false);
        }
    }, [submit])

    return (
        <div>
            <Modal.Header>
                <Modal.Title >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle-center" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                </Modal.Title>
            </Modal.Header>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} className="btn-dark" eventKey="0">
                            sign In
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{(isRegistered === 0) && <div>
                            <Modal.Body>
                                <form className="row g-4 needs-validation" noValidate>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control_ login-input" id="id" required placeholder="ID"
                                            onChange={(e) => setUser({ ...user, id: e.target.value })} />
                                    </div>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control_ login-input" id="userName" required placeholder="User Name"
                                            onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                                    </div>
                                    <div className="col-md-12">
                                        <Input
                                            type={values.showPassword ? "text" : "password"}
                                            onChange={handlePasswordChange("password")}
                                            value={values.password}
                                            className="form-control_ login-input"
                                            placeholder="Password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}>
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </div>
                                </form></Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger " onClick={props.handleClose}>
                                    Close</Button>
                                <Button variant="primary btn-dark" onClick={saveChange}>
                                    Save Changes</Button>
                            </Modal.Footer>
                        </div>}
                            {(isRegistered === 1) && <div>
                                <Modal.Body>You have not registered yet </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={props.handleClose}>
                                        Close</Button>
                                    <Button variant="primary" onClick={() => { signUp(); props.handleClose(); }}>
                                        sign Up</Button>
                                    <Button variant="warning" onClick={() => { goBack(); }}>
                                        Go Back</Button>
                                </Modal.Footer>
                            </div>}
                            {(isRegistered === 2) && <div>
                                <Modal.Body>One of the details we entered is incorrect </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={props.handleClose}>
                                        Close</Button>

                                    <Button variant="warning" onClick={goBack}>
                                        Go Back</Button>
                                </Modal.Footer></div>}</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} className="btn-dark" eventKey="1">
                            Forget Password?</Accordion.Toggle>
                    </Card.Header>
                    <ForgetPassword
                        handleClose={props.handleClose}
                        user={user}
                        setIsRegistered={setIsRegistered}
                        changeUser={props.changeUser}
                        isRegistered={isRegistered}
                        goBack={goBack}
                        signUp={signUp}
                        setIsRegistered={setIsRegistered} />
                </Card>
            </Accordion>
        </div>
    )
}

Login.defaultProps = {
    type: "text",
    value: "",
    errorMessage: "",
    placeholder: ""
}