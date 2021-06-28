

export const getProducts = async (category) => {
    let res = await fetch(`http://localhost:27017/Products/${category}`, {
        method: 'GET'
    })
    const details = await res.json();
    return details;
}


export const getProduct = async (id) => {
    let res = await fetch(`http://localhost:27017/Products/product/${id}`, {
        method: 'GET'
    })
    const details = await res.json();
    return details[0];
};
