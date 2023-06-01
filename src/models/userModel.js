import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String,
      select: false
    },
    connected_platform: {
      type: Array
    },
    zoho: {
      organizations: {
        type: Array
      },
      access_token: {
        type: String
      },
      refresh_token: {
        type: String
      }
    },
    is_active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const userModel = model('user', userSchema);
export default userModel;
