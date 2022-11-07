import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
    //전체 상품 정보 get
    async findAll() {
        const products = await Product.find()
        return products;
    }
    
    //상품 추가 post
    async createProduct(productInfo) {
        const createProduct = await Product.create(productInfo);
        return createProduct;
    }
    //상품 업데이트
    async update({seq, update}) {
        return await Product.findOneAndUpdate({seq}, update, { returnOriginal: false});
    }
    //상품 삭제
    async delete(seq) {
        return await Product.findOneAndDelete({seq});
    }
    //상품 정보
    async findById(seq) {
        return await Product.findOne({seq});
    }
    //카테고리에 맞는 상품 하나 찾기
    async findOneByCategoryName(category) {
        const product = await Product.findOne(category);
        return product;
    }
    //카테고리에 맞는 상품 다 찾기
    async findAllByCategoryName(category) {
        const products = await Product.find(category);
        return products;
    }    
}
const productModel = new ProductModel();

export { productModel };

