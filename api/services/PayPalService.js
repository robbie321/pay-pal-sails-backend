const paypal = require('paypal-rest-sdk');
const firebase = require('firebase');

paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id:
    'AWH3neqIoKxHtw_Y4eYsb0QRUcY57TclDF-FVxbqN58SuNdpFmTa2Rh_f24lPmofpHOHT3HmvUbbpW6n',
  client_secret:
    'EC1NHXMExnhC44H0eynfgZ37NDBaHPurUHKsGhRX3iXECObh99GnR8k0_fRyjah32aLqA0eG7JQmgqaD',
});

require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyC3tVP-fuqR9f4xDBrPiINFxMHqq5kYup4',
  authDomain: 'tournament-website.firebaseapp.com',
  databaseURL: 'https://tournament-website.firebaseio.com',
  projectId: 'tournament-website',
  storageBucket: '',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const ref = db.ref('clients');

module.exports = {
  paymentPaypal(paymentID, execute_payment_json, payment, cb) {
    paypal.payment.execute(
      paymentID,
      execute_payment_json,
      (error, paymentLog) => {
        if (error) {
          return cb(error);
        }
        // the logic after  successful payment  here just save the payment in a databse
        payment.email = paymentLog.payer.payer_info.email;
        payment.first_name = paymentLog.payer.payer_info.first_name;
        payment.last_name = paymentLog.payer.payer_info.last_name;
        // payment.title = paymentLog.transactions[0].item_list.items[0].name;
        ref.push({ payment });
        // console.log(payment);
        Payment.create(payment).exec((err, result) => {
          cb(null, 'done');
        });
      },
    );
  },
};
