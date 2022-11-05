import { orderModel } from "../db";

class OrderService {
    // 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
    constructor(orderModel) {
      this.orderModel = orderModel;
    }

        async addOrder(orderInfo) {
        const { email, products, address, phoneNumber } = orderInfo;
        // 날짜로 주문번호 생성
        const newDate = new Date();
        function formatDate(newDate){
        let formattedDate = `${ newDate.getFullYear() }`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }`;
        formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`; 
        return formattedDate;
        }
        const orderId = formatDate(newDate);

        const totalPrice = products.reduce((acc, curr)=>{
          return acc.price + curr.price;
      }); 
        const deliveryStatus = "상품준비중";
        const newOrderInfo = { email, orderId, products, totalPrice, address, phoneNumber, deliveryStatus};
        const order = orderModel.create(newOrderInfo);
        return order;
      }


    async setOrder(orderId, orderInfo){
      const { address, phoneNumber } = orderInfo;
      const update = {address, phoneNumber};
      return orderModel.update(orderId, update);
    }
}

const orderService = new OrderService(orderModel);

export { orderService };