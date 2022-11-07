import { Router } from "express";
import is from "@sindresorhus/is";
import { productService } from "../services";

const productRouter = Router();

//상품 등록
productRouter.post("/product", async (req, res, next) => {
    try {
        if(is.emptyObject(req.body)) {
            throw new Error(
                'create product error'
            );
        } 
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }//safd
});

//전체 상품 목록 가져오기
productRouter.get("/products", async (req, res) => {
    const products = await productService.getproducts();

    res.status(200).json(products);
})

//상품 정보 수정
productRouter.patch('/:seq', async(req, res, next) => {
    try {
        const { seq } = req.params;
        const { productName, price, content, category, image } = req.body;
        
        const toUpdate = {
            ...(productName && { productName }),
            ...(price && { price }),
            ...(content && { content }),
            ...(category && { category }),
            ...(image && { image }),

        }

        const updateProduct = await productService.setProduct(seq, toUpdate);
        res.status(201).send(updateProduct);
    } catch( error) {
        next(error);
    }
});

//상품 삭제
productRouter.delete('/:seq', async(req, res, next) => {
    const { seq } = req.params;
    const deleteProduct = await productService.deleteProduct(seq);

    res.status(201).send(deleteProduct);
})

export { productRouter };