export type ServiceItem = {
  service_code: any;
  name: string;
  image: string;
};

export const Services:ServiceItem[] = [
  { service_code: "PAJAK", name: "PBB", image: "/assets/image/PBB.png" },
  { service_code: "PLN", name: "Listrik", image: "/assets/image/Listrik.png" },
  { service_code: "PDAM", name: "Air PDAM", image: "/assets/image/PDAM.png" },
  { service_code: "PULSA", name: "Pulsa", image: "/assets/image/Pulsa.png" },
  { service_code: "PGN", name: "PGN", image: "/assets/image/PGN.png" },
  { service_code: "MUSIK", name: "Musik", image: "/assets/image/Musik.png" },
  { service_code: "TV", name: "TV Langganan", image: "/assets/image/Televisi.png" },
  { service_code: "PAKET_DATA", name: "Paket Data", image: "/assets/image/Paket Data.png" },
  { service_code: "VOUCHER_GAME", name: "Voucher Game", image: "/assets/image/Game.png" },
  { service_code: "VOUCHER_MAKANAN", name: "Voucher Makanan", image: "/assets/image/Voucher Makanan.png" },
  { service_code: "QURBAN", name: "Kurban", image: "/assets/image/Kurban.png" },
  { service_code: "ZAKAT", name: "Zakat", image: "/assets/image/Zakat.png" },
];