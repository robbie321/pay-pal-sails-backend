/**
 * PaymentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  checkoutPaypal(req, res) {
    console.log(req.body);
    const execute_payment_json = {
      payer_id: req.body.data.payerID,
    };
    const payment = {};
    payment.amount = req.body.data.amount;
    payment.title = req.body.data.title;
    const { paymentID } = req.body.data;
    PayPalService.paymentPaypal(
      paymentID,
      execute_payment_json,
      payment,
      (err, result) => {
        if (err) res.negotiate(err);
        res.ok(result);
      },
    );
  },
};
