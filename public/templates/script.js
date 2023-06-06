// ********************* START SCRIPT FOR BIG-COMMERCE AUTH FORM *********************

// EVENT LISTENER REGISTER FOR EACH INPUT FIELDS
const inputs = document.querySelectorAll('input');
inputs.forEach((el) => {
  document.addEventListener('change', handleInput);
});

// GET TOKEN
let token;
setTimeout(() => {
  token = document.querySelector('#token').value;
}, 1000);

// PAYLOAD
let payload = {
  platform: 'bigcommerce',
  storeHash: '',
  accessToken: '',
  clientId: '',
  clientSecret: ''
};
// TOAST CREATOR
const showToast = (message) => {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
};

// GET DATA FROM INPUT FIELDS
const handleInput = (e) => {
  switch (e.target.name) {
    case 'storeHash':
      toggleClass(e);
      payload = { ...payload, storeHash: e.target.value };
      break;
    case 'accessToken':
      toggleClass(e);
      payload = { ...payload, accessToken: e.target.value };
      break;
    case 'clientId':
      toggleClass(e);
      payload = { ...payload, clientId: e.target.value };
      break;
    case 'clientSecret':
      toggleClass(e);
      payload = { ...payload, clientSecret: e.target.value };
      break;
  }
};

// TOGGLE CLASS ON ERROR
const toggleClass = (e) => {
  e.target.value.length < 10
    ? e.target.classList.add('error')
    : e.target.classList.remove('error');
};

// HANDLE SUBMIT
// eslint-disable-next-line no-unused-vars
const handleSubmit = async () => {
  const btn = document.getElementById('button');
  const isValid = Object.values(payload).every((el) => el.length > 0);
  if (!isValid) return showToast('Please fill all the required fields');
  if (payload?.storeHash?.length !== 10) return showToast('Please enter valid store hash');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer' + ' ' + token
    },
    body: JSON.stringify(payload)
  };
  try {
    btn.disabled = true;
    btn.innerText = 'Connecting...';
    const res = await fetch('connect-platform', options);
    const data = await res.json();
    btn.disabled = false;
    btn.innerText = 'Connect Shop';
    if (data?.success) {
      showToast('Connected successfully');
      window.location.href = `process.env.APP_URL}/?token=${token}`;
    } else {
      showToast(data?.msg);
      btn.disabled = false;
      btn.innerText = 'Connect Shop';
    }
  } catch (error) {
    console.log('error', error);
  }
};

// ********************* END SCRIPT FOR BIG-COMMERCE AUTH FORM *********************
