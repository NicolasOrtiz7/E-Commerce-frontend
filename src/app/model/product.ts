export class Product {

    productId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    important: boolean;

    category: ProductCategory;
    productStock: ProductStock;
}

export class ProductCategory{
    categoryId: number;
    name: string;
    image: string;
}

export class ProductStock{
    stockId: string;
    quantity: number;
}
