import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useAuth } from "../context/AuthContext";


function MyOrders(){

  const {user} = useAuth();

  const [orders,setOrders] = useState([]);


  const getOrders = async()=>{

   const {data,error} = await supabase
.from("orders")
.select("*");

    if(error){
      console.log(error);
      return;
    }


    setOrders(data);

  };


  useEffect(()=>{

    if(user){
      getOrders();
    }

  },[user]);



  return(

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>


      <table className="w-full border">

        <thead className="bg-gray-900 text-white">

          <tr>

            <th className="p-3 border">
              Order ID
            </th>

            <th className="p-3 border">
              Total
            </th>

            <th className="p-3 border">
              Status
            </th>

          </tr>

        </thead>


        <tbody>

        {
          orders.map((order,index)=>(

            <tr key={order.id || index}>

              <td className="p-3 border">
                {order.id}
              </td>


              <td className="p-3 border">
                ${order.total}
              </td>


              <td className="p-3 border">
                {order.status}
              </td>


            </tr>

          ))
        }


        </tbody>


      </table>


    </div>

  )

}


export default MyOrders;