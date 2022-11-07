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

      async find(orderDate, orderNumber) {
        const order = await Order.findOne({ orderId: orderDate, orderNumber });
        return order;
     }

     async findAll(userId) {
      const orders = await Order.find({ email: userId });
      return orders;
   } // document 중에서 userId 값이 userId인 document 다 찾아서 보여주기

   async findAllAdmin() {
    const order = await Order.find({});
    return order;
 }

    async delete(orderId){
      return await Order.findOneAndDelete({ orderId }); 
    }


}

const orderModel = new OrderModel();

export { orderModel };