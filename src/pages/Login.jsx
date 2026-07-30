import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Login
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    // Current User
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("User ID:", user.id);

    // Profile Table se Role Check
    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    console.log("Profile:", data);
    console.log("Profile Error:", profileError);

    if (profileError) {
      toast.error("Profile not found");
      return;
    }

    toast.success("Login Successful");

    // Role ke hisab se redirect
    if (data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Toaster />

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

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

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;