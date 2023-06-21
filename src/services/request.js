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
    const option = {
      method: 'GET',
      url: `https://api.bigcommerce.com/${payload?.url}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': payload?.access_token
      }
    };
    return await axios(option);
  } catch (error) {
    console.log('ERRR', error?.message);
    return error;
  }
};
export const bigComPostCall = async (payload) => {
  try {
    const option = {
      method: 'POST',
      url: `https://api.bigcommerce.com/${payload?.url}`,
      data: payload?.body,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': payload?.access_token
      }
    };
    return await axios(option);
  } catch (error) {
    console.log('error', error?.message);
    return error;
  }
};
