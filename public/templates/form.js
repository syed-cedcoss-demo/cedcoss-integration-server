export const bigcommerceConnectForm = (token) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BigCommerce Auth Form</title>    
    <meta http-equiv="content-security-policy"
      script-src 'self' sha256-llcVRMdHvkNYwW2gD8kALVWzxiIN51bYoWAy/5ICnso=
    />
   <link rel="icon"
        href="https://dev.apps.cedcommerce.com/marketplace-integration/static/modules/etsy/assets/images/favicon.ico">
    <meta name="theme-color" content="#000000" />
    <style>
      #feedback-form {
        max-width: 410px;
        margin: 0 auto;
        background-color: #fcfcfc;
        padding: 20px 50px 40px;
        box-shadow: 1px 4px 10px 1px #aaa;
        font-family: sans-serif;
        border-radius: 8px;
      }

      #feedback-form * {
        box-sizing: border-box;
      }

      #feedback-form h2 {
        text-align: center;
        margin-bottom: 30px;
      }

      #feedback-form input {
        margin-bottom: 15px;
      }

      #feedback-form input[type="text"] {
        display: block;
        height: 42px;
        padding: 6px 16px;
        width: 100%;
        border: 1px solid gray;
        font-size: 16px;
        font-weight: 500;
        background-color: #fff9f9;
        border-radius: 4px;
      }

      #feedback-form label {
        color: #777;
        font-size: 0.8em;
      }

      #feedback-form input[type="checkbox"] {
        float: left;
      }

      .button {
        display: block;
        margin: 20px auto 0;
        width: 150px;
        height: 40px;
        border-radius: 8px;
        border: none;
        color: #eee;
        font-weight: 700;
        box-shadow: 1px 4px 10px 1px #aaa;
        cursor: pointer;
        background: #431bbc; /* Old browsers */
      }
      .error {
        border-color: red !important;
        border-width: 2px !important;
      }
      #toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div id="feedback-form">
      <h3 class="header">BigCommerce Connection</h3>
      <div id="container">
        <input type="text" name="storeHash" placeholder="Enter store hash" />
        <input type="text" name="accessToken" placeholder="Enter access token" />
        <input type="text" name="clientId" placeholder="Enter client id" />
        <input type="text" name="clientSecret" placeholder="Enter client secret" />
        <button class="button" onclick="handleSubmit()" id="button">Connect Shop</button>
      </div>
      <div id="toast"/>
    </div>
    <script type="text/javascript">
      //EVENT LISTENER REGISTER FOR EACH INPUT FIELDS
      const inputs = document.querySelectorAll("input");
      inputs.forEach((el) => {
        document.addEventListener("change", handleInput);
      });
      //PAYLOAD
      let payload = {
        platform:"bigcommerce",
        storeHash: "",
        accessToken: "",
        clientId: "",
        clientSecret: "",
      };
      //TOAST CREATOR
      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.innerText = message;
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
        }, 3000);
      }

      //GET DATA FROM INPUT FIELDS
      function handleInput(e) {
        switch (e.target.name) {
          case "storeHash":
            toggleClass(e);
            payload = { ...payload, storeHash: e.target.value };
            break;
          case "accessToken":
            toggleClass(e);
            payload = { ...payload, accessToken: e.target.value };
            break;
          case "clientId":
            toggleClass(e);
            payload = { ...payload, clientId: e.target.value };
            break;
          case "clientSecret":
            toggleClass(e);
            payload = { ...payload, clientSecret: e.target.value };
            break;
        }
      }

      //TOGGLE CLASS ON ERROR
      function toggleClass(e) {
        e.target.value.length < 10
          ? e.target.classList.add("error")
          : e.target.classList.remove("error");
      }

      //HANDLE SUBMIT      
      async function handleSubmit() { 
       const btn=document.getElementById("button");
       const  isValid = Object.values(payload).every((el) => el.length > 0);
        if (!isValid) return showToast("Please fill all the required fields");     
        if(payload?.storeHash?.length != 10) return showToast("Please enter valid store hash");
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer"+" "+"${token}"
          },
          body: JSON.stringify(payload),
        };
        try {       
          btn.disabled=true;
          btn.innerText="Connecting..."   
          const res = await fetch("connect-platform", options);
          const data = await res.json();
          btn.disabled=false;
          btn.innerText="Connect Shop"
          if(data?.success){
            showToast("Connected successfully");
            window.location.href = "${process.env.APP_URL}/?token=${token}";
          }else{
            showToast(data?.msg);
            btn.disabled=false;
            btn.innerText="Connect Shop"
          }
        }
         catch (error) {
          console.log('error', error)
        }
      }
    </script>
  </body>
</html>

    `;
};
