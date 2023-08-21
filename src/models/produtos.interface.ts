export enum STATUS {
    draft = "draft",
    trash = "trash",
    published = "published",
}

export interface Produtos {
    code: number;
    status: STATUS;
    imported_t: Date;
    url: string;
    creator: string;
    created_t: number;
    last_modified_t: number;
    product_name: string;
    quantity: string;
    brands: string;
    categories: string;
    labels: string;
    cities: string;
    purchase_places: string;
    stores: string;
    ingredients_text: string;
    traces: string;
    serving_size: string;
    serving_quantity: number;
    nutriscore_score: number;
    nutriscore_grade: string;
    main_category: string;
    image_url: string;
}