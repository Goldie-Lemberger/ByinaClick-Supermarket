
export const getComments = async () => {
    let res = await fetch(`http://localhost:27017/Comments`);
    let responses = await res.json();
    return responses;
};

export const addComment = async (response) => {
   let check =  await fetch(`http://localhost:27017/Comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
    });

    const details = await check.json();
    return details;
};