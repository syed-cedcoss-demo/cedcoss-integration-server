import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    user_id: {
      type: String
    },
    item_id: {
      type: String
    },
    item_name: {
      type: String
    },
    sku: {
      type: String
    },
    item: {
      type: Object
    }
  },
  { timestamps: true }
);

const productModel = model('product', productSchema);
export default productModel;
