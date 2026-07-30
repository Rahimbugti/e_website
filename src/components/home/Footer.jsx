import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Rahim Store
            </h2>

            <p className="text-gray-400">
              Your one-stop online shopping destination for laptops,
              mobiles, accessories and premium gadgets.
            </p>
          </div>

          {/* Quick Links */}
          <div>

            <h2 className="text-xl font-bold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3 text-gray-400">

              <li>Home</li>
              <li>Products</li>
              <li>Categories</li>
              <li>Contact</li>

            </ul>

          </div>

          {/* Customer Support */}
          <div>

            <h2 className="text-xl font-bold mb-5">
              Customer Support
            </h2>

            <ul className="space-y-3 text-gray-400">

              <li>Shipping</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h2 className="text-xl font-bold mb-5">
              Contact Us
            </h2>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                Pakistan
              </div>

              <div className="flex items-center gap-3">
                <FaPhone />
                +92 300 1234567
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                info@rahimstore.com
              </div>

            </div>

            <div className="flex gap-4 mt-6 text-2xl">

              <FaFacebook className="hover:text-blue-500 cursor-pointer" />

              <FaInstagram className="hover:text-pink-500 cursor-pointer" />

              <FaTwitter className="hover:text-sky-400 cursor-pointer" />

              <FaLinkedin className="hover:text-blue-400 cursor-pointer" />

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center text-gray-400">

        © 2026 Rahim Store. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;