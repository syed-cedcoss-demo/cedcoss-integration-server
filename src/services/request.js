import axios from 'axios';

export const reActive = async () => {
  try {
    await axios.get('https://node-server-setup-2-0.onrender.com/');
  } catch (error) {
    console.log('error', error);
  }
};

export const bigcommerceInstance = axios.create({
  baseURL: 'https://api.bigcommerce.com/stores/'
});
