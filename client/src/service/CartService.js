export const addCart = async (cart) => {

    await fetch((`http://localhost:27017/Cart`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    });
};

export const updateCart = async (cart) => {

    await fetch((`http://localhost:27017/Cart/${JSON.parse(localStorage.user).id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    });
};

export const getCart = async (id) => {
    const res = await fetch(`http://localhost:27017/Cart/${id}`);
    const details = await res.json();
    return details[0];
};
