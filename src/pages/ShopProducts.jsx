import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart } from "react-icons/fa";


function ShopProducts() {

  const [products,setProducts] = useState([]);

  const {dispatch} = useCart();


  useEffect(()=>{

    getProducts();

  },[]);



  const getProducts = async()=>{

    const {data,error} = await supabase
      .from("products")
      .select("*");


    if(error){

      console.log(error);
      return;

    }


    setProducts(data || []);

  };



  const addToCart = (product)=>{


    dispatch({

      type:"ADD_TO_CART",

      payload:product

    });


    toast.success("Added to Cart 🛒");

  };



  return (

    <div className="max-w-7xl mx-auto p-10">


      <h1 className="text-4xl font-bold mb-10">
        All Products
      </h1>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


      {
        products.map((item)=>(


          <div
          key={item.id}
          className="bg-white shadow-lg rounded-xl overflow-hidden"
          >


          <div className="relative">


          <img

          src={item.image}

          alt={item.title}

          className="w-full h-60 object-cover"

          />


          <Link

          to="/wishlist"

          className="absolute top-3 right-3 bg-white p-3 rounded-full text-red-500"
          >

          <FaHeart/>

          </Link>


          </div>



          <div className="p-5">


          <h2 className="text-xl font-bold">
            {item.title}
          </h2>


          <p className="text-blue-600 font-bold mt-3">
            ${item.price}
          </p>



          <div className="flex gap-3 mt-5">


          <Link

          to={`/product/${item.id}`}

          className="bg-blue-600 text-white px-4 py-2 rounded"

          >

          View

          </Link>



          <button

          onClick={()=>addToCart(item)}

          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"

          >

          <FaShoppingCart/>

          Cart

          </button>


          </div>


          </div>


          </div>


        ))
      }


      </div>


    </div>

  );

}


export default ShopProducts;