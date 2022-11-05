import { Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        email : {
            type: String,
            required: true,
        },
        products: {
            type: Object,
            required: true,
        }, 
        totalPrice: {
            type: Number,
            required: true,
        },
        deliveryStatus: {
            type: String,
            required: true,
        },
        address: {
            type: new Schema({
                postalCode:String,
                address1: String,
                address2: String,
            },{_id:false}),
            required: true,
            default: {},
        },
        phoneNumber: {
            type: String,
            required: true },
            
        orderedAt: {
            type: Date, 
            immutable: true,
             default: ()=> Date.now(),
            }
    }, {
        collection: 'orders',
    }
)

export { OrderSchema };