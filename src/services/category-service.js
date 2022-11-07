import { CategoryModel, productModel } from "../db";

class CategoryService {
    constructor(CategoryModel, productModel) {
        this.CategoryModel = CategoryModel;
        this.productModel = productModel;
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
    async getCategoryByName(CategoryInfo) {
        const category = await this.categoryModel.findByCategory(CategoryInfo);
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!category) {
        throw new Error(
            "없는 카테고리입니다."
        );
        }
    
        return category;
    }
    
    async deleteCategory(category) {
        let product = await this.productModel.findOneByCategoryName(category)

        if (product) {
            "카테고리에 등록된 제품이 있습니다. 등록된 제품이 없어야 삭제가 가능합니다."
        }
        let category = await CategoryModel.delete(seq);
        if (!category) {
            throw new Error ('없는 카테고리입니다.');
        }
        return category;
    } 
}

const CategoryService = new CategoryService(CategoryModel, productModel);

export { CategoryService };