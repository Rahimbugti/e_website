import { useState } from "react";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Subscribed Successfully!");
    setEmail("");
  };

  return (
    <section className="bg-blue-700 py-20 text-white">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">
          Subscribe Our Newsletter
        </h2>

        <p className="mt-4 text-lg text-blue-100">
          Get the latest offers, discounts and new arrivals.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 justify-center mt-10"
        >

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-4 rounded-lg text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-200"
          >
            Subscribe
          </button>

        </form>

      </div>
    </section>
  );
}

export default Newsletter;