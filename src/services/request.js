import axios from 'axios';

export const reActive = async () => {
  try {
    await axios.get('https://cedcoss-integration-server.onrender.com/');
  } catch (error) {
    console.log('error', error);
  }
};

export const bigComGetCall = async (payload) => {
  try {
    const url = `https://api.bigcommerce.com/${payload?.url}`;
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': payload?.access_token
      }
    };
    const response = await axios.post(url, option);
    return response;
  } catch (error) {
    return error;
  }
};
export const bigComPostCall = async (payload) => {
  try {
    const url = `https://api.bigcommerce.com/${payload?.url}`;
    const option = {
      method: 'POST',
      body: payload?.body,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': payload?.access_token
      }
    };
    const response = await axios.post(url, option);
    return response;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};
