import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {

  const { cart, dispatch } = useCart();

  console.log("Cart Page:", cart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <h2 className="text-xl">
          Your Cart is Empty
        </h2>
      ) : (
        <>
          {cart.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between border p-5 rounded mb-5"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  className="w-28 h-28 object-cover rounded"
                />

                <div>

                  <h2 className="text-xl font-bold">
                    {item.title}
                  </h2>

                  <p className="text-blue-600 font-bold mt-2">
                    ${item.price}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    dispatch({
                      type: "DECREASE_QTY",
                      payload: item.id,
                    })
                  }
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  -
                </button>

                <span className="text-xl">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch({
                      type: "INCREASE_QTY",
                      payload: item.id,
                    })
                  }
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  +
                </button>

              </div>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item.id,
                  })
                }
                className="bg-red-600 text-white px-5 py-2 rounded"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="text-right mt-10">

            <h2 className="text-3xl font-bold">
              Total: ${total.toFixed(2)}
            </h2>

           <Link to="/checkout">
  <button
    className="bg-green-600 text-white px-8 py-3 rounded mt-5"
  >
    Checkout
  </button>
</Link>

          </div>

        </>
      )}

    </div>
  );
}

export default Cart;