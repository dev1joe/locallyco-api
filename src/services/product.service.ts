// TODO: return Product object
export function getProducts(): Array<Object> {
    return [
        { id: 1, name: "Product A", price: 29.99 },
        { id: 2, name: "Product B", price: 49.99 },
        { id: 3, name: "Product C", price: 19.99 },
    ];
}

// TODO: return Product object
export function getProductById(id: number): Object | false {
    return { id: id, name: `Product ${id}`, price: 39.99 };
}