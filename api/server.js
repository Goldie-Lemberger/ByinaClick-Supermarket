const app = require("express")();
let bodyParser = require("body-parser");


const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:36906',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.listen(27017, () => {
    console.log("connect localhost");
});

app.use('/Users', require('./users'));
  app.use('/Cart', require('./cart'));
 app.use('/Products', require('./products'));
 app.use('/Comments', require('./comments'));
 app.use('/InvoicingDuc', require('./invoicingDuc'));




app.get('/', (req, res) => {
    res.json({ "message": "Congratulations! you are working great!" });
});


