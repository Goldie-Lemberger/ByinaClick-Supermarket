import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Header from './components/header/Header';
import Home from './components/home/Home.js';
import NewClient from './components/newClient/NewClient.js';
import BusinessCustomer from './components/newClient/businessCustomer/BusinessCustomer.js';
import PrivateCustomer from './components/newClient/privateCustomer/PrivateCustomer';
import Items from './components/items/Items';
import Footers from './components/Footers/Footers';
import StartBuy from './components/startBuy/StartBuy';
import About from './components/about/About';
import Login from './components/login/Login';
import Modal from 'react-bootstrap/Modal'
import Cart from './components/cart/Cart';
import { updateCart } from './service/CartService';
import Payment from './components/payment/Payment';
import FinalPayment from './components/payment/FinalPayment';
import { useHistory } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Comments from './components/comments/Comments';
import Faq_ from './components/faq/Faq_';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [userNow, setUserNow] = useState()
  const handleClose = () => setShow(false);

  const [show, setShow] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [updateSumCart, setUpdateSumCart] = useState(false);

  let history = useHistory();

  const changeUser = async (newUser, newCart) => {
    if (isUser) { updateCart(JSON.parse(localStorage.cart)) };
    handleClose();
    setUserNow(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('cart', JSON.stringify(newCart));
    setIsUser(true);
    setUpdateSumCart(!updateSumCart);
  }

  const signout = () => {
    updateCart(JSON.parse(localStorage.cart))
    localStorage.clear();
    setIsUser(false);
    history.push('/');
    setUpdateSumCart(!updateSumCart);
  }

  return (
    <div >
      <Header updateSumCart={updateSumCart} userNow={userNow} isUser={isUser} setShow={setShow} signout={signout} />


      <div className="App">
        <Modal show={show} onHide={handleClose} animation={false}>
          <Login handleClose={handleClose} changeUser={(user, cart) => { changeUser(user, cart) }} />
        </Modal>
        <Modal
          show={showAbout}
          onHide={() => setShowAbout(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          size="lg"
          >
          <About />
        </Modal>
   
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/items' component={Items} />
          <Route path='/faq' component={Faq_}/>
          <Route path='/fruitsAndVegetables' render={() => (<Items type="fruitsAndVegetables" onUpdateSumCart={() => setUpdateSumCart(!updateSumCart)} onsetShow={()=>{setShow(true)}} />)} />
          <Route path='/dairyAndEggProducts' render={() => (<Items type="dairyAndEggProducts" onUpdateSumCart={() => setUpdateSumCart(!updateSumCart)} onsetShow={()=>{setShow(true)}}/>)} />
          <Route path='/drinks' render={() => (<Items type="drinks" onUpdateSumCart={() => setUpdateSumCart(!updateSumCart)} onsetShow={()=>{setShow(true)}}/>)} />
          <Route path='/dryProducts' render={() => (<Items type="dryProducts" onUpdateSumCart={() => setUpdateSumCart(!updateSumCart)} onsetShow={()=>{setShow(true)}} />)} />
          <Route path='/startBuy' component={StartBuy} />
          <Route exact path='/newClient' render={(props) =>
            (<NewClient {...props} handleClose={handleClose} changeUser={(user, cart) => { changeUser(user, cart) }} setShow={setShow}/>)} />
          <Route path='/newClient/BusinessCustomer'
            render={(props) =>
            (<BusinessCustomer {...props}
              type="BusinessCustomer" showAbout={showAbout} setShowAbout={setShowAbout} />)} />‏
        <Route path='/newClient/privateCustomer' render={(props) => (<PrivateCustomer {...props} type="PrivateCustomer" showAbout={showAbout} setShowAbout={setShowAbout} />)} />
          <Route exact path='/cart' render={(props) => (<Cart {...props} onUpdateSumCart={() => setUpdateSumCart(!updateSumCart)} />)} />
          <Route exact path='/cart/payment' render={(props) => (<Payment {...props} />)} />
          <Route path='/cart/payment/final' render={(props) => (<FinalPayment {...props}  onUpdateSumCart={() => setUpdateSumCart(!updateSumCart)}/>)} />
          <Route path='/comments' render={(props) => (<Comments {...props} />)} />

        </Switch>
      </div>


      <Footers   showAbout={showAbout} setShowAbout={setShowAbout}/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

    </div>
  );
}

export default App;
