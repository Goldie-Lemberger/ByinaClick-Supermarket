import React from "react";
import './Faq_.css'
import Faq from "react-faq-component";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "What are the product policies that were damaged during transportation?",
            content: `The packing and shipping is done by God-fearing and very responsible students,
            in case you received a blown, or broken product, please contact the customer service center as soon as possible, 
           and in the next purchase you will be rewarded!`,
        },
        {
            title: "How long does it take to make my purchase?",
            content:
                "We strive to deliver the shipment within two business days from the moment of payment",
        }, {
            title: "What to do if a product is not in stock?",
            content: `If a product is not in stock, 
                   you will receive a cash credit, 
                    because we deliver exactly the products ordered without subsidiaries and the like.`
        },
        {
            title: "Is it possible to cancel products?",
            content: `No, because the order is processed immediately, products cannot be canceled`
        },
        

    ],
};

const styles = {
    bgColor: '#E0E0E0',
    titleTextColor: "rgb(12, 91, 105)",
    rowTitleColor: "rgb(17, 147, 170)",
    rowContentColor: 'grey',
    arrowColor: "red",
    rowTitlePaddingRight: '50px',
    rowTitlePaddingLeft: '50px',

    rowContentPaddingRight: '50px',
    rowContentPaddingBottom: '10px',
    rowContentPaddingLeft: '50px',
};


export default function Faq_() {

    return (
        <div className="container">
            <Faq
                data={data}
                styles={styles}

            />
        </div>
    );
}


