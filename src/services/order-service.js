import { orderModel } from "../db";

class OrderService {
    // 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
    constructor(orderModel) {
      this.orderModel = orderModel;
    }

    async addOrder(orderInfo) {
        const { email, products, address, phoneNumber } = orderInfo;
    // userId는 로그인 된 정보로 user db에서 찾아야되고
    const totalPrice = products.reduce((acc, curr)=>{
      return acc.price + curr.price;
  }); 
        const deliveryStatus = "상품준비중";

        const newOrderInfo = { email, products, totalPrice, address, phoneNumber, deliveryStatus};

        const order = orderModel.create(newOrderInfo);
        // db에 저장
        return order;
        // 만든 새로운 order document 리턴
      }


    async setOrder(orderId, orderInfo){
      const { address, phoneNumber } = orderInfo;
      const update = {address, phoneNumber};
      return orderModel.update(orderId, update);
    }
}

const orderService = new OrderService(orderModel);

export { orderService };