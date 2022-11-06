import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("categories", CategorySchema);

export class CategoryModel {
    async findByCategory(categoryName) {
        return await Category.findOne(categoryName);
    }
    //카테고리 생성
    async create(CategoryInfo) {
        const createCategory = await Category.create(CategoryInfo);
    }
    //수정
    async update({seq, update}) {
        return await Category.findOneAndUpdate({seq}, update, { returnOriginal: false});
    }
    //전체 조회
    async findAll() {
        const categories = await Category.find();
        return categories;
    }
    //특정 카테고리 조회
    async findById(seq) {
        const category = await Category.findOne({seq});
        return category;
    }
    //삭제
    async delelte(seq) {
        return await Category.findByIdAndDelete({seq});
    }
}