function OrderSuccess(){

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-4xl font-bold text-green-600">
          Order Placed Successfully 🎉
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your order.
          Confirmation email will be sent soon.
        </p>

      </div>
    </div>
  );
}



export default OrderSuccess;