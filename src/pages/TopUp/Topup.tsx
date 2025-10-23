import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AlertError, AlertSuccess } from "../../utils/swal/swal";
import { TopUp } from "../../api/topup";

const ListTopup = [10000, 20000, 50000, 100000, 250000, 500000];

const Topup = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const handlePresetClick = (value: number) => {
    setAmount((prevAmount) => (prevAmount === value ? null : value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAmount(isNaN(value) ? null : value);
  };

  const handleTopupClick = () => {
    if (amount && amount >= 10000 && amount <= 1000000) {
      setShowConfirm(true);
    }
  };
  const confirmTopup = async () => {
    if (!token) {
      AlertError("Token tidak ditemukan. Silakan login ulang.");
      return;
    }
    if (amount === null) {
      AlertError("Nominal Top Up tidak valid.");
      return;
    }

    try {
      const response = await TopUp(amount, token);
      const result = response.data;
      if (result.status === 0) {
        AlertSuccess("Top Up berhasil!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        AlertError(result.message || "Top Up gagal");
      }
    } catch (error) {
      AlertError("Terjadi kesalahan saat Top Up");
      console.error(error);
    }
  };

  const cancelTopup = () => {
    setShowConfirm(false);
  };

  const isValidAmount = amount !== null && amount >= 10000 && amount <= 1000000;

  return (
    <div className="max-w-screen mx-auto mt-10 p-6 bg-white rounded-lg shadow-md lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full max-w-[1000px]">
          <input
            type="number"
            value={amount ?? ""}
            onChange={handleInputChange}
            placeholder="Masukkan Nominal Topup"
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleTopupClick}
            disabled={!isValidAmount}
            className={`w-full px-4 py-2 rounded-md transition ${
              isValidAmount
                ? "bg-red-500 text-white hover:bg-red-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Top Up
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {ListTopup.map((value) => (
            <button
              key={value}
              onClick={() => handlePresetClick(value)}
              className={`py-2 px-4 border rounded-md text-sm font-medium ${
                amount === value
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Rp{value.toLocaleString("id-ID")}
            </button>
          ))}
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <img
                src="/assets/image/Logo.png"
                alt="logo"
                className="mx-auto mb-4 w-10 h-10"
              />
              <p className="mb-4 font-medium">
                Anda yakin untuk Top Up sebesar <br />
                <span className="text-black font-bold">
                  Rp{amount?.toLocaleString("id-ID")} ?
                </span>
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmTopup}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Ya, lanjutkan Top Up
                </button>
                <button
                  onClick={cancelTopup}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topup;
