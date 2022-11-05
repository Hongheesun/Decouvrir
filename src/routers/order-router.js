import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { orderService } from "../services";
import mongoose from "mongoose";


const orderRouter = Router();

// 주문 생성
orderRouter.post('/order', async(req, res, next)=> {
    console.log("주문 만들기")
try{
    const newOrder = await orderService.addOrder(req.body)
      res.status(201).json(newOrder)
} catch(err){
    next(err);
}
});

//주문 수정
orderRouter.patch('/order/:orderId', async(req, res, next)=> {
    try{
         const orderId = req.params.orderId;

        const updatedOrder = await orderService.setOrder(orderId, req.body)
        res.json({
            message: '주문 정보 수정 성공',
            data: updatedOrder,
        })
    }
 catch(err){
    next(err);
}});

export { orderRouter };