import { Router } from "express";
import is from "@sindresorhus/is";
import { CategoryService } from '../services';

const categoryRouter = Router();

categoryRouter.post('/', async (req, res, next) => {
    const title = req.body.title;

})
categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await CategoryService.getCategories();

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
})