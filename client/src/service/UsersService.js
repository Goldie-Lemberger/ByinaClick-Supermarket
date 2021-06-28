export const addUser = async (userDetails) => {

    const checkPost = await fetch("http://localhost:27017/Users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
    });
    const details = await checkPost.json();
    return details;
};

export const getUser = async (id) => {

    let res = await fetch(`http://localhost:27017/Users/${id}`, {
        method: 'GET'
    })

    const details = await res.json();
    return details[0];
};

export const getUserToReset = async (id) => {

    let res = await fetch(`http://localhost:27017/Users/reset/${id}`, {
        method: 'GET'
    })

    const details = await res.json();
    return details;
};

export const updateUser = async (user) => {

    await fetch((`http://localhost:27017/Users/${user.id}`), {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

};