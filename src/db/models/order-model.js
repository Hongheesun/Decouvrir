import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
    async create(orderInfo) {
        const createdOrder = await Order.create(orderInfo);
        return createdOrder;
      } 


      async update(orderId, update){
        return await Order.updateOne({orderId}, update)
      }

      async find(orderId) {
        const order = await Order.findOne({ orderId });
        return order;
     }

     async findAll() {
      const order = await Order.find({});
      return order;
   }

    async delete(orderId){
      return await Order.findOneAndDelete({ orderId }); 
    }


}

const orderModel = new OrderModel();

export { orderModel };