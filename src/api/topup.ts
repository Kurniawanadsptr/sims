import api from "./api";

export const TopUp = async (amount: number, token: string) => {
  return api.post(
    "/topup",
    { top_up_amount: amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
