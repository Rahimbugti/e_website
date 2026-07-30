import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function SalesReport() {
  const [report, setReport] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    deliveredOrders: 0,
  });

  const getReport = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const revenue = data.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0
    );

    const delivered = data.filter(
      (item) => item.status === "Delivered"
    ).length;

    setReport({
      totalRevenue: revenue,
      totalOrders: data.length,
      deliveredOrders: delivered,
    });
  };

  useEffect(() => {
    getReport();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Rahim Store Sales Report", 14, 20);

    autoTable(doc, {
      startY: 35,
      head: [["Title", "Value"]],
      body: [
        ["Total Revenue", `$${report.totalRevenue}`],
        ["Total Orders", report.totalOrders],
        ["Delivered Orders", report.deliveredOrders],
      ],
    });

    doc.save("sales-report.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Sales Report
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Revenue</h2>

          <p className="text-3xl font-bold text-green-600">
            ${report.totalRevenue}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Orders</h2>

          <p className="text-3xl font-bold">
            {report.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Delivered Orders</h2>

          <p className="text-3xl font-bold text-blue-600">
            {report.deliveredOrders}
          </p>
        </div>

      </div>

      <button
        onClick={downloadPDF}
        className="bg-red-600 text-white px-6 py-3 rounded mt-6"
      >
        Download PDF Report
      </button>
    </div>
  );
}

export default SalesReport;