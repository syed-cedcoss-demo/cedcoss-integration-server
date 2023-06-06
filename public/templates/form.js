export const bigcommerceConnectForm = (token) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>BigCommerce Auth Form</title>    
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
   <script src="${process.env.SERVER_URL}/file/script.js"></script>
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
      <input type="hidden" value="${token}" id="token"/>
    </div>
   
  </body>
</html>

    `;
};
