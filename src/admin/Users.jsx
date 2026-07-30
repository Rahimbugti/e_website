import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import toast from "react-hot-toast";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const getUsers = async () => {

    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending:false });


    if(error){

      toast.error("Users load failed");
      console.log(error);
      return;

    }


    setUsers(data);
    setLoading(false);

  };



  const changeRole = async (id, currentRole) => {


    const newRole =
      currentRole === "admin"
      ? "user"
      : "admin";



    const {error} = await supabase
      .from("profiles")
      .update({
        role:newRole
      })
      .eq("id",id);



    if(error){

      toast.error("Role update failed");
      return;

    }



    toast.success("Role updated");


    getUsers();

  };



  useEffect(()=>{

    getUsers();

  },[]);



  if(loading){

    return (
      <div className="p-10 text-xl">
        Loading Users...
      </div>
    )

  }



  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-8">
        Users Management
      </h1>



      <div className="bg-white shadow-xl rounded-xl overflow-hidden">


      <table className="w-full">


      <thead className="bg-slate-900 text-white">

        <tr>

          <th className="p-4">
            Name
          </th>


          <th className="p-4">
            Email
          </th>


          <th className="p-4">
            Role
          </th>


          <th className="p-4">
            Joined
          </th>


          <th className="p-4">
            Action
          </th>


        </tr>

      </thead>



      <tbody>


      {
        users.map((user)=>(

          <tr 
          key={user.id}
          className="border-b hover:bg-gray-50"
          >


            <td className="p-4 font-semibold">
              {user.name}
            </td>



            <td className="p-4">
              {user.email}
            </td>



            <td className="p-4">


              <span
              className={
                user.role==="admin"
                ?
                "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                :
                "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              }
              >

                {user.role}

              </span>


            </td>



            <td className="p-4">

              {
                new Date(user.created_at)
                .toLocaleDateString()
              }

            </td>



            <td className="p-4">

              <button

              onClick={()=>
                changeRole(
                  user.id,
                  user.role
                )
              }

              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

              >

                {
                  user.role==="admin"
                  ?
                  "Make User"
                  :
                  "Make Admin"
                }

              </button>


            </td>


          </tr>


        ))
      }


      </tbody>


      </table>


      </div>


    </div>

  );
}


export default Users;