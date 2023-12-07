import { Category } from "./category";

export class SubCategory {
    id?: number;
    name!: string;
    description!: string;
    categoryId!: number;
    category?: Category[]; // Use an array if category is a collection
    date!: Date;

    archive!: boolean;}