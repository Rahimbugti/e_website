import { useState } from "react";
import { supabase } from "../supabase/supabase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSignup = async (e) => {
    e.preventDefault();


    // Create User in Supabase Auth
    const { data, error } = await supabase.auth.signUp({

      email: formData.email,

      password: formData.password,

    });


    if (error) {

      toast.error(error.message);
      return;

    }


    // Save User Profile
    if (data.user) {

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([

          {
            id: data.user.id,
            name: formData.name,
            email: formData.email,
            role: "user",
          }

        ]);


      if (profileError) {

        toast.error(profileError.message);
        return;

      }

    }


    toast.success("Signup Successful");


    setTimeout(() => {

      navigate("/login");

    }, 1500);


  };



  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <Toaster />


      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >


        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>



        <input

          type="text"

          name="name"

          placeholder="Name"

          className="border w-full p-3 mb-4 rounded"

          onChange={handleChange}

        />



        <input

          type="email"

          name="email"

          placeholder="Email"

          className="border w-full p-3 mb-4 rounded"

          onChange={handleChange}

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          className="border w-full p-3 mb-4 rounded"

          onChange={handleChange}

        />



        <button

          className="bg-blue-600 text-white w-full py-3 rounded"

        >

          Signup

        </button>


      </form>


    </div>

  );

}


export default Signup;