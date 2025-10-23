import api from "./api";

interface Update {
  first_name: string;
  last_name: string;
}

export const getProfile = async (token: string) => {
  return api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (
  token: string,
  payload: Update
) => {
  const response = await api.put("/profile/update", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.data.status !== 0) {
    throw new Error(response.data.message || "Gagal update profil");
  }

  return response.data.data;
};

export const updateImage = async (
  token: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.put("/profile/image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.data.status !== 0) {
    throw new Error(response.data.message || "Gagal update foto profil");
  }

  return response.data.data;
};
