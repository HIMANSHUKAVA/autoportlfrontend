const BuyNow = () => {
  const payNow = (amount, orderId) => {
    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    const options = {
      key: "rzp_test_S0XseAdZlcbad2",
      amount: amount * 100,
      currency: "INR",
      name: "AutoPortal",
      description: "Car Payment",
      order_id: orderId,
      handler: function (response) {
        alert("Payment Success");
        console.log(response);
      },
      theme: { color: "#f5c46b" },
    };

    new window.Razorpay(options).open();
  };

  return { payNow };
};

export default BuyNow;
