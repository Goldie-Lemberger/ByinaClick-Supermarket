const isValidName = (name) => {
    let regex = /^([a-zA-Z ]{1,20})$/;
    return name === "" ? true : regex.test(name);
}

const isValidEmail = (mail) => {
    let regex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    return mail === "" ? true : regex.test(mail);
}

const isValidCell = (cell) => {
    let regex = /^([0-9]{7,10})$/;
    return cell === "" ? true : regex.test(cell)
}

const isValidId = (id) => {
    let regex = /^([0-9]{9})$/;
    if (regex.test(id)) {
        let IntegrityID = 0;
        for (let index = 0; index < id.lenght; index++) {
            let digit = (Number(id[index]) * ((index % 2 + 1)))
            IntegrityID += digit > id.lenght ? digit - id.lenght : digit;
        }
        return (IntegrityID % 10) === 0;
    }
    return id === "" ? true : false;
}


const isValidAddress = (address) => {
    let regex = /^[a-zA-Z ']{1,20}[ ][1-9]{1,3}[ ][a-zA-Z ']{1,20}$/;
    return address === "" ? true : regex.test(address);
}

const isValidPassword = (password) => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    return password === "" ? true : regex.test(password);
}

const isValidCvc = (cvc) => {
    let regex = /^[0-9]{3}$/;
    return cvc === "" ? true : regex.test(cvc);
}

const isValidCardValidity = (date) => {
    let regex = /^[0-2]{1}[0-9]{1}[/][0-9]{2}$/;
    return date === "" ? true : regex.test(date);

}

const isValidCardNumber = (card) => {
    let regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    return card === "" ? true : regex.test(card);

}
const isValidEmployees = (num) => {
    let regex = /^[0-9]{1,4}$/;
    return num === "" ? true : regex.test(num);
}



export const isValide = (value_) => {
    let message_ = "";
    switch (value_.name) {
        case "lastName":
            if (!isValidName(value_.value)) {
                message_ = "The name entered is incorrect, try a name without numbers or symbols";
            }
            break;
        case "firstName":
            if (!isValidName(value_.value)) {
                message_ = "The name entered is incorrect, try a name without numbers or symbols";
            }
            break;
        case "userEmail":
            if (!isValidEmail(value_.value)) {
                message_ = "The email address entered is incorrect, please try the template at abc@gmail.com";
            }
            break;
        case "id":
            if (!isValidId(value_.value)) {
                message_ = "Incorrectly entered ID, verify that a valid ID has been entered";
            }
            break;
        case "address":
            if (!isValidAddress(value_.value)) {
                message_ = "The address entered is incorrect, check that you entered in the following format: Street Number-Building and City";
            }
            break;
        case "password":
            if (!isValidPassword(value_.value)) {
                message_ = "invalid password: password must contain at least 8 charchters including at least one digit, lowercase and uppercase letter";

            }
            break;

        case "expiry":
            if (!isValidCardValidity(value_.value)) {
                message_ = "The date entered is incorrect";

            }
            break;
        case "cvc":
            if (!isValidCvc(value_.value)) {
                message_ = "Three digits must be entered, as found on the back of the card";

            }
            break;

        case "name":
            if (!isValidName(value_.value)) {
                message_ = "Please enter first name and last name";

            }
            break;
        case "number":
            if (!isValidCardNumber(value_.value)) {
                message_ = "Incorrect card number entered";
            }
            break;
        case "typeBusiness":
            if (!isValidName(value_.value)) {
                message_ = "Please select a valid business.";
            }
            break;

        case "employees":
            if (!isValidEmployees(value_.value)) {
                message_ = " Please provide a number of employees.";
            }
            break;
        case "company":
            if (!isValidName(value_.value)) {
                message_ = " Please provide a Company / business name.";
            }
            break;
        case "phoneNumber":
            if (!isValidCell(value_.value)) {
                message_ = "The phone number entered is incorrect, check that it has all the required digits";
            }
            break;
        default:
            break;
    }
    return message_;
}