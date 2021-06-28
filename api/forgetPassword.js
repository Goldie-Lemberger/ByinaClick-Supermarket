
const sentEmail = require('./sentEmail');


const randomCode = () => { return Math.floor(Math.random() * 10000) + 1000; };

const resetPassword = async (user) => {

    const codeee = randomCode();
    await sentEmail(user.userEmail,'Reset password on site Bay in a Click‏',
    `
    <h3>hellow ${user.lastName} ${user.firstName}</h3><br/>
    <p>To continue resetting your password,

    please enter this code: <b><u>${codeee}</u></b>
    </p>
    <br/>
    <br/>
    <p>Keep up the fun shopping! <b>Buy in a Click. </b></p>
    <br/>
    `,[{
        filename: 'Barcode1.png',
        path: __dirname + '/images/Barcode1.png',
        cid: 'unique@kreata.ee'
    }]);
    return codeee;
}
module.exports = resetPassword;