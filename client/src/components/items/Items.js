import React, { useEffect, useState } from 'react'
import Item from '../item/Item.js'
import './Items.css'

import { getProducts } from '../../service/ProductsService'

const Items = (props) => {
    const [myItems, setMyItems] = useState([]);

    useEffect( () => {
        async function fetchData() {
        let products = await getProducts(props.type);
        setMyItems(products);
        }
        fetchData();
    }, [props.type])



    return (
        <div>
            <div className="margeing">
                <div className="row row-cols-3 row-cols-md-6 g-4">
                    {Object.keys(myItems).map((index) => {
                        return (
                            <div key={index}>
                                <Item
                                    id={myItems[index].id}
                                    imageItem={myItems[index].imageItem}
                                    nameItem={myItems[index].nameItem}
                                    informationItem={myItems[index].informationItem}
                                    priceItem={myItems[index].priceItem}
                                    onUpdateSumCart={props.onUpdateSumCart}
                                    onsetShow={props.onsetShow}/>
                                   
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Items;