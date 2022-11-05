import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { orderService } from "../services";
import mongoose from "mongoose";


const orderRouter = Router();

// 주문 생성
orderRouter.post('/order', async(req, res, next)=> {
try{
    const newOrder = await orderService.addOrder(req.body)
      res.status(201).json(newOrder)
} catch(err){
    next(err);
}
});

//주문 수정
orderRouter.patch('/orders/:orderId', async(req, res, next)=> {
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

orderRouter.get('/orders', async(req, res, next)=> {
    try{
        const orders = await orderService.getAllOrders();
        res.json(orders)
    } catch(err){
        next(err);
    }
})

orderRouter.get('/orders/:orderId', async(req, res, next)=> {
    try{
        const orderId = req.params.orderId;
        const order = await orderService.getOneOrder(orderId);
        res.json(order)
    } catch(err){
        next(err);
    }
})

orderRouter.delete('/orders/:orderId', async(req, res, next)=> {
    try{
        const orderId = req.params.orderId
        await orderService.deleteOrder(orderId);
        res.json(
            {
                message: '주문 정보 삭제 완료'
            }
        )

    } catch(err){
        next(err);
    }
})



export { orderRouter };