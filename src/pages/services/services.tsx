import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { payService, ServiceItem } from "../../api/service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AlertError, AlertQuestion, AlertSuccess } from "../../utils/swal/swal";

const ServicesPayment = () => {
  const { slug } = useParams();
  const [service, setService] = useState<ServiceItem | null>(null);
  const saldo = useSelector((state: RootState) => state.dashboard.saldo);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const cached = localStorage.getItem("services");
    if (!cached || !slug) return;

    const allServices: ServiceItem[] = JSON.parse(cached);
    const selected = allServices.find((s) => s.service_code === slug);
    setService(selected || null);
  }, [slug]);

  const handlePayment = async (service: ServiceItem) => {
    if (!service) {
      AlertError("Layanan tidak ditemukan.");
      return;
    }
    const amount = service.service_tariff || 0;
    if (!saldo || saldo.balance < amount) {
      AlertError(
        "Maaf Saldo Anda Tidak Mencukupi, Silahkan Isi Saldo Anda Terlebih Dahulu"
      );
      return;
    }
    const confirm = await AlertQuestion();
    if (!confirm.isConfirmed) return;

    try {
      const result = await payService(token, service.service_code, amount);
      AlertSuccess(`Transaksi berhasil! Invoice: ${result.invoice_number}`);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error("Gagal bayar:", err);
      AlertError("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  return (
    <div className="max-w-screen mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-start">
        <div className="w-full max-w-[1920px]">
          <input
            type="number"
            value={service?.service_tariff}
            placeholder="Masukkan Nominal Topup"
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            className="bg-red-500 text-white hover:bg-red-700 w-full px-4 py-2 rounded-md transition"
            onClick={() => {
              if (!service) {
                AlertError("Layanan tidak ditemukan.");
                return;
              }
              handlePayment(service);
            }}
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPayment;
