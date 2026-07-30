import { useEffect, useState } from "react";

function FlashSale() {
  const [time, setTime] = useState({
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-red-600 text-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold">
          ⚡ Flash Sale
        </h2>

        <p className="mt-4 text-lg">
          Hurry Up! Offer Ends In
        </p>

        <div className="flex justify-center gap-6 mt-8">

          <div className="bg-white text-black px-6 py-4 rounded-xl">
            <h1 className="text-4xl font-bold">
              {String(time.hours).padStart(2, "0")}
            </h1>
            <p>Hours</p>
          </div>

          <div className="bg-white text-black px-6 py-4 rounded-xl">
            <h1 className="text-4xl font-bold">
              {String(time.minutes).padStart(2, "0")}
            </h1>
            <p>Minutes</p>
          </div>

          <div className="bg-white text-black px-6 py-4 rounded-xl">
            <h1 className="text-4xl font-bold">
              {String(time.seconds).padStart(2, "0")}
            </h1>
            <p>Seconds</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FlashSale;