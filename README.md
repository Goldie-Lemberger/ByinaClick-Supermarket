
# `Buy in a Click - shop website`

<p align="center">
  <img src=client\src\asset\Barcode1.png width="250" title="hover text">
</p>

>Buy in a Click website is here to sell you all that you need to cook. Its pages are as below. A page for the Home, Store - which can be opened by categories, About, Shopping cart, Shipping, Payment form, Faq-frequently asked questions, comments. Additionally, there is a sign-up form and a login form to the site.

**`Important`: in order to use this app you must run the following in the terminal:**
* npm install
* npm start
-------------------------------------------
The application contains a header and footer toolbar that can navigate between the pages. It is also possible to get to the pages by using links:
* **Home** - http://localhost:36906 
* **Shop** (choose category) - http://localhost:36906/startBuy 
* **Shop** (fruits And Vegetables) - http://localhost:36906/fruitsAndVegetables 
* **Shop** (dairy And Egg Products) - http://localhost:36906/dairyAndEggProducts 
* **Shop** (drinks) - http://localhost:36906/drinks 
* **Shop** (dry Products) - http://localhost:36906/dryProducts 
* **Shopping Cart** (Can only log in when sign in on the site) - http://localhost:36906/cart 
* **Checkout** - http://localhost:36906/cart/payment 
* **insert Cardit card** - http://localhost:36906/cart/payment/final 
* **sign up** - http://localhost:36906/newClient
* **sign up - privte costumer** - http://localhost:36906/newClient/privateCustomer 
* **sign up - business Customer** - http://localhost:36906/newClient/businessCustomer 

* **Faq** - http://localhost:3000/faq 
* **Comments** - http://localhost:36906/comments 
----------------------------------------------
**The website uses the following components**:
> *Most of the following Components receive the currentUser as props which is stored in the local storage and use its information when needed.*

Before buying, the user must register on the site - without it, he can do nothing, except to see which products are available and which comments have been responded to, he must choose between two options:
 1. Registration as a business customer - which gives a ten percent discount.
 2. Regular customer

When registering the user must enter correct details in accordance with the detailed validations.
After completing the registration, an email is sent to the user as the email he entered, with a reminder about the login details for the following times.
Then, every time he wants to buy again the user will have to log in to the LOGIN page (it is not possible to register for the same ID)
In case the user forgets the password, on the LOGIN page there is an option Forgot password - where the user will enter the ID information as well as Email, and will receive a verification code for the email, which he will have to enter on the site and only then can change the password as he wishes.

To start shopping, go to Start Buy from the homepage or from the Header and there select a desired category, where in addition to the basket there will be a Toast message announcing that a certain item has been added to the basket.

After completing the purchase, the user will go to the shopping cart that appears in the header, where he will be able to update or change for the last time the products he previously added to the basket.

When he clicks on payment the user will be able to choose between two options or leave the details he entered at the time of registration, or switch to another address, then he will be transferred to the one where he will enter the credit details.

When clicking on Pay, The invoice will sent to his email
In addition, the user will be able to rate the experience on the site by following http: // localhost: 36906 / comments - provided that he logs in his name, when he has not logged in, he can not rate.

And yes, in case of a problem or question the user can access the FAQ page: http: // localhost: 36906 / faq
(The other routings were not specified as they are simple and understandable from the user flow process) 

* The  cart implement with localStorge technic, where they are saved when log in or log out we update the mongodb
* All the data save in mongodb atlas and the implementation of server si in nodejs and mongo



------------------------------------------------
### `I hope you enjoy this website as many hours and effort went into building it.`

<p align="center">
  <img src="client\public\favicon.ico" width="150" title="hover text">
</p>

