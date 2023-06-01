import { model, Schema } from 'mongoose';

const processSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    process: {
      type: String
    },
    platform: {
      type: String
    }
  },
  { timestamps: true }
);

const currentProcessModel = model('current_process', processSchema);
export default currentProcessModel;
