import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
              🔥 BIG SALE 50% OFF
            </span>

            <h1 className="text-5xl font-extrabold mt-6 leading-tight">
              Upgrade Your <br />
              Dream Setup
            </h1>

            <p className="text-gray-300 mt-6 text-lg">
              Discover the latest laptops, gaming accessories,
              smartphones and premium gadgets at unbeatable prices.
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black"
              >
                Explore
              </Link>

            </div>

          </div>

          <div className="flex justify-center">

            <video
              src="/videos/ad-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
            >
              Your browser does not support the video tag.
            </video>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;