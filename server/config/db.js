const dotend = require("dotenv");
require('dotenv').config();

module.exports = {
  MONGOURI: process.env.MONGOURI,
  JWT_SECRET : process.env.JWT_SECRET,
  JWT_ACCOUNT_ACTIVATION : process.env.JWT_ACCOUNT_ACTIVATION,
  JWT_RESET_PASSWORD : process.env.JWT_RESET_PASSWORD,
  CLIENT_URL : process.env.CLIENT_URL,
  BRAINTREE_MERCHANT_ID : process.env.BRAINTREE_MERCHANT_ID,
  BRAINTREE_PUBLIC_KEY : process.env.BRAINTREE_PUBLIC_KEY,
  BRAINTREE_PRIVATE_KEY : process.env.BRAINTREE_PRIVATE_KEY,
  SENDGRID_API_KEY : process.env.SENDGRID_API_KEY,
  EMAIL_TO : process.env.EMAIL_TO,
  EMAIL_FROM : process.env.EMAIL_FROM,
  GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID
}
