import { toast, Zoom } from 'react-toastify';


const addToCart = async (product) => {
    
    
    const Msg = () => (
        <div>
            <img src={product.imageItem} alt={product.nameItem} width="30%" className="img-toast"></img>
            <div className="title-toast">
                {product.nameItem + " added to your cart"}
            </div>
        </div>
    
    )
    let cart_ = JSON.parse(localStorage.cart);
    const item = cart_.cart.findIndex((item_) => {
        return item_.id === product.id;
    });
    if ((item > -1)) {
        cart_.cart[item].amount += 1;
        cart_.totalPrice += Number(product.priceItem);
        toast.dark(<Msg />, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            transition: Zoom
        });
    }
    else {
        cart_.cart.push({
            id: product.id,
            imageItem: product.imageItem,
            nameItem: product.nameItem,
            informationItem: product.informationItem,
            priceItem: product.priceItem,
            category: product.category,
            amount: 1,
        })
        cart_.totalPrice += Number(product.priceItem);
        toast.dark(<Msg />, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    localStorage.cart = JSON.stringify(cart_);
}


export default addToCart