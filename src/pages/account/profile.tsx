import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getProfile, updateImage, updateProfile } from "../../api/profile";
import Navbar from "../../MasterLayout/Navbar";
import Loading from "../../utils/loading/loading";
import {
  AlertError,
  AlertLoading,
  AlertSuccess,
  CloseSwal,
} from "../../utils/swal/swal";
import { resetDashboard } from "../../redux/slices/dashboard";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/loginSlice";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
}

const MAX_IMAGE_SIZE = 100 * 1024;

const ProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        const data = response.data.data;

        const cleanProfile = {
          ...data,
          profile_image:
            !data.profile_image ||
            data.profile_image ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
              ? "/assets/image/Profile Photo.png"
              : data.profile_image,
        };

        setProfile(cleanProfile);
      } catch (err) {
        console.error("Gagal ambil profil:", err);
        Cookies.remove("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetDashboard());
    localStorage.removeItem("services");
    localStorage.removeItem("servicesExpired");
    Cookies.remove("token");
    navigate("/");
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= MAX_IMAGE_SIZE;

    if (!isValidType) {
      AlertError("Format gambar harus JPG atau PNG.");
      return;
    }

    if (!isValidSize) {
      AlertError("Ukuran gambar maksimum 100 KB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!token || !formData) return;

    setIsSaving(true);
    AlertLoading("Menyimpan profil...");

    try {
      let updatedData = await updateProfile(token, {
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (selectedFile) {
        updatedData = await updateImage(token, selectedFile);
      }

      const cleanProfile = {
        ...updatedData,
        profile_image:
          !updatedData.profile_image ||
          updatedData.profile_image ===
            "https://minio.nutech-integrasi.com/take-home-test/null"
            ? "/assets/image/profile Photo.png"
            : updatedData.profile_image,
      };

      setProfile(cleanProfile);
      setIsEditing(false);
      setFormData(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      CloseSwal();
      AlertSuccess("Profil berhasil diperbarui!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Gagal update profil:", err);
      CloseSwal();
      AlertError("Gagal memperbarui profil.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !profile) return <Loading />;

  const { email, first_name, last_name, profile_image } =
    isEditing && formData ? formData : profile;

  const imageUrl =
    previewUrl || profile_image || "/assets/image/profile Photo.png";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
        <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4">
          <img
            src={imageUrl}
            alt="Avatar"
            onClick={handleAvatarClick}
            className={`w-full h-full rounded-full object-cover border-4 border-white shadow-md cursor-pointer ${
              isEditing ? "hover:opacity-80" : ""
            }`}
          />
          {isEditing && (
            <>
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                <img
                  src="/assets/image/pencil.png"
                  alt="Edit"
                  className="w-5 h-5"
                />
              </div>
              <input
                type="file"
                accept="image/jpeg,image/png"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 text-center">
          {`${first_name} ${last_name}`}
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-6">
          <div className="space-y-4">
            <InputField
              label="Email"
              value={email}
              readOnly={!isEditing}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev!, email: val }))
              }
            />
            <InputField
              label="Nama Depan"
              value={first_name}
              readOnly={!isEditing}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev!, first_name: val }))
              }
            />
            <InputField
              label="Nama Belakang"
              value={last_name}
              readOnly={!isEditing}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev!, last_name: val }))
              }
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`py-3 rounded text-white ${
                    isSaving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
                >
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  onClick={handleCancel}
                  className="border border-gray-500 text-gray-500 py-3 rounded hover:bg-gray-500 hover:text-white"
                >
                  Batalkan
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="border border-red-500 text-red-500 py-3 rounded"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="border bg-red-500 text-white py-3 rounded hover:bg-red-700 hover:text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

interface InputFieldProps {
  label: string;
  value: string;
  readOnly: boolean;
  onChange: (val: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  readOnly,
  onChange,
}) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border p-3 rounded ${
        readOnly ? "bg-gray-100 border-gray-300" : "bg-white border-gray-300"
      }`}
    />
  </div>
);
