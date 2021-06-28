export const invoicing = async (details) => {
   const check = await fetch("http://localhost:27017/InvoicingDuc", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
    });
    const detail = await check.json();
    return detail;


};