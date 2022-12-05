const SSLCommerzPayment = require("sslcommerz");
const { v4: uuidv4 } = require("uuid");
const { app } = require("../config/config");
const {
  createOrder,
  updateOrderPayment,
  updateOrder,
  getOrderByTranId,
} = require("../post/order/order.service");

module.exports.PaymentInit = async (req, res) => {
  try {
    const productInfo = {
      total_amount: req.body.total_amount,
      currency: "BDT",
      tran_id: uuidv4(),
      success_url:
        "https://supershop-server.herokuapp.com/order/ssl-payment/success",
      fail_url:
        "https://supershop-server.herokuapp.com/order/ssl-payment/failure",
      cancel_url:
        "https://supershop-server.herokuapp.com/order/ssl-payment/cancel",
      ipn_url: "https://supershop-server.herokuapp.com/order/ssl-payment/ipn",
      paymentStatus: "pending",
      shipping_method: "Courier",
      product_name: req.body.product_name,
      product_category: req.body.category,
      product_profile: req.body.orderItems,
      product_image: req.body.productImage,
      cus_name: req.user.name,
      cus_email: req.user.email,
      cus_add1: req.body.shippingAddress,
      cus_add2: req.body.shippingAddress,
      cus_city: req.body.shippingAddress.city,
      cus_state: req.body.shippingAddress.state,
      cus_postcode: req.body.shippingAddress.postalCode,
      cus_country: req.body.shippingAddress.country,
      cus_phone: req.user.number,
      cus_fax: req.user.number,
      ship_name: req.user.name,
      ship_add1: req.body.shippingAddress,
      ship_add2: req.body.shippingAddress,
      ship_city: req.body.shippingAddress.city,
      ship_state: req.body.shippingAddress.state,
      ship_postcode: req.body.shippingAddress.postalCode,
      ship_country: req.body.shippingAddress.country,
      multi_card_name: "mastercard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    await updateOrder({
      transactionId: productInfo.tran_id,
    });

    const sslcommerz = new SSLCommerzPayment(
      app.store_id,
      app.store_password,
      false // when add original payment it will be true
    );

    sslcommerz
      .init(productInfo)
      .then((data) => {
        //process the response that got from sslcommerz
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
        const info = { ...productInfo, ...data };
        // console.log(info.GatewayPageURL);
        if (info.GatewayPageURL) {
          res.json(info.GatewayPageURL);
        } else {
          return res.status(400).json({
            message: "SSL session was not successful",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        //! source.on is not a function
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ message: "Ops! Payment not successful", error });
  }
};

module.exports.Success = async (req, res) => {
  try {
    const data = {
      valId: req.body.val_id,
      isPaid: true,
      paidAt: new Date().toUTCString(),
      paymentResult: {
        id: req.body.tran_id,
        status: "success",
        updateTime: new Date().toUTCString(),
      },
    };
    const updatedOrder = await updateOrderPayment(req.body.trn_id, data);
    return res.redirect(`http://localhost:3000/order/${updatedOrder._id}`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.Failure = async (req, res) => {
  try {
    const data = {
      transactionId: "",
      isPaid: false,
      valId: "",
    };
    await updateOrderPayment(req.body.tran_id, data);
    return res.status(500).json({ message: "Ops! Payment not successful" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.Cancel = async (req, res) => {
  try {
    const data = {
      transactionId: "",
      isPaid: false,
      valId: "",
    };
    await updateOrderPayment(req.body.tran_id, data);
    return res.status(500).json({ message: "Ops! Payment cancel" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.Ipn = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ ...req.body, message: "Payment successful!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.Validate = async (req, res) => {
  try {
    const order = await getOrderByTranId(req.body.transactionId);

    if (order.valId === req.body.valId) {
      const data = {
        paymentResult: {
          id: req.body.tran_id,
          status: "success",
          updateTime: new Date().toUTCString(),
        },
      };
      await updateOrderPayment(req.body.transactionId, data);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
