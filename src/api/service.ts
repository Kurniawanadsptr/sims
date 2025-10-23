import { Services } from "../utils/imageServices/Services";
import api from "./api";

export interface ServiceItem {
  service_code: string;
  service_name?: string;
  service_icon?: string;
  service_tariff?: number;
  name?: string;
  image?: string;
}

export interface TransactionResponse {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: "PAYMENT";
  total_amount: number;
  created_on: string;
}

export interface TransactionRecord {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export const getCustomService = async (
  token: string
): Promise<ServiceItem[]> => {
  try {
    const response = await api.get("/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const apiData = response.data.data;

    const merged = apiData.map((apiItem: ServiceItem) => {
      const local = Services.find(
        (localItem) => localItem.service_code === apiItem.service_code
      );

      return {
        ...apiItem,
        name: local?.name || apiItem.service_name,
        image: local?.image || apiItem.service_icon,
      };
    });

    return merged;
  } catch (error) {
    console.error("Gagal mengambil data layanan:", error);
    return [];
  }
};

export const payService = async (
  token: string,
  service_code: string,
  amount: number
): Promise<TransactionResponse> => {
  const response = await api.post(
    "/transaction",
    {
      service_code,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = response.data;
  if (result.status === 0) {
    return result.data;
  } else {
    throw new Error(result.message || "Transaksi gagal");
  }
};

export const getTransactionHistory = async (
  token: string,
  offset: number,
  limit: number
): Promise<TransactionRecord[]> => {
  const response = await api.get("/transaction/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { offset, limit },
  });

  const result = response.data;
  if (result.status === 0) {
    return result.data.records;
  } else {
    throw new Error(result.message || "Gagal mengambil histori transaksi");
  }
};