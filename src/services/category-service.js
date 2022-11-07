import { CategoryModel } from "../db";

class CategoryService {
    constructor(CategoryModel) {
        this.CategoryModel = CategoryModel;
    }
    async getCategories() {
        return await this.CategoryModel.findAll();
    }
    async addCategory(CategoryInfo) {
        const { category } = CategoryInfo;
        //중복확인
        const categoryName = await this.CategoryModel.findByCategory(category);
        if (categoryName) {
            throw new Error('이미 생성된 카테고리입니다.');
        }
        return await this.CategoryModel.create(CategoryInfo);
    }
    async setCategory(seq, toUpdate) {
        let category = await this.CategoryModel.findOne(seq);
        if (!category) {
            throw new Error ('없는 카테고리입니다.');
        }

        let categoryName = await this.CategoryModel.findByCategory(toUpdate.category);
        if(categoryName) {
            throw new Error ('이미 있는 카테고리입니다.');
        }
        return await this.CategoryModel.toUpdate({
            seq,
            update: toUpdate,
        })
    }
    async deleteCategory(seq) {
        let category = await CategoryModel.delete(seq);
        if (!category) {
            throw new Error ('없는 카테고리입니다.');
        }
        return category;
    } 
}

const CategoryService = new CategoryService(CategoryModel);

export { CategoryService };