import Swal from "sweetalert2";

export const AlertError = (message: string) =>
  Swal.fire({
    icon: "error",
    title: message,
    confirmButtonText: "OK",
    showConfirmButton: true,
    customClass: {
      confirmButton:
        "bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700",
    },
  });

export const AlertInfo = (message: string) =>
  Swal.fire({
    icon: "info",
    title: message,
    confirmButtonText: "OK",
    showConfirmButton: true,
    customClass: {
      confirmButton:
        "bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700",
    },
  });
export const AlertQuestion = () => {
  return Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Pembelian yang sudah dibayar tidak bisa dibatalkan!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, lanjutkan!",
    cancelButtonText: "Batal",
    customClass: {
      confirmButton:
        "bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700",
      cancelButton:
        "bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400",
    },
  });
};
export const AlertSuccess = (message: string) =>
  Swal.fire({
    icon: "success",
    title: message,
    confirmButtonText: "OK",
    showConfirmButton: true,
    customClass: {
      confirmButton:
        "bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700",
    },
  });

export const AlertLoading = (message = "Proses") => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const CloseSwal = () => {
  Swal.close();
};
