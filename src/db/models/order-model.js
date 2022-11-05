import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

// OrderSchema 모델 만들기
const Order = model("orders", OrderSchema);

// exports.Order = model("orders", OrderSchema);
export class OrderModel {
    async create(orderInfo) {
        const createdOrder = await Order.create(orderInfo);
        return createdOrder;
      } // orderInfo에는 OrderSchema의 규격에 맞는 객체가 들어옴


      async update(orderId, update){
        // update = {address, phoneNumber}
        return await Order.updateOne({_id:orderId}, update)
        // orderId 완성되면 { orderId }가 들어와야 함(첫번째 인자에)
      }


      // async findById(orderId) {
      //   const order = await Order.findOne({ _id: orderId });
      //   return order;
     // }  orderId는 _id값에 맞는 랜덤 문자열
}

const orderModel = new OrderModel();

export { orderModel };