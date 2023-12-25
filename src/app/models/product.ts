import { SubCategory } from "./subcategory";

export class Product {
    id!: number;
    name!: string;
    originalPrice!: number;
    discountedPrice!: number;
    description!: string;
    stock!: number;
    date!: Date;
    subCategoryId!: number;
    subCategory!: SubCategory; // Assuming you have a SubCategory model
    color!: string;
     size: string[] = [];
    material!: string;
    composition!: string;
    col!: string;
    promo!: boolean;
    onSale!: boolean;
    imageUrls!: string[];
}