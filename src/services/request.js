import axios from 'axios';

export const reActive = async () => {
  try {
    await axios.get('https://cedcoss-integration-server.onrender.com/');
  } catch (error) {
    console.log('error', error);
  }
};

export const bigcommerceInstance = axios.create({
  baseURL: 'https://api.bigcommerce.com/stores/'
});
