export const productsToString = (products: any[]) => {
    const productsArr = products.map((product) => product.name);
    const productsStr = productsArr.join('; ')
    return productsStr;
}