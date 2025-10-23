import { useState } from "react";

interface ProfileProps {
  profile: {
    first_name: string;
    last_name: string;
    profile_image?: string;
  } | null;
  saldo: {
    balance: number;
  };
}

const ProfileSection: React.FC<ProfileProps> = ({ profile, saldo }) => {
  const [showSaldo, setShowSaldo] = useState(false);
  const toggleSaldo = () => setShowSaldo((prev) => !prev);

  const Image = (url?: string): string => {
    if (
      !url ||
      url === "https://minio.nutech-integrasi.com/take-home-test/null"
    ) {
      return "/assets/image/Profile Photo.png";
    }
    return url;
  };

  const ImageProfile = Image(profile?.profile_image);

  return (
    <div className="bg-white shadow-sm py-6">
      <div className="px-6 md:px-8 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col items-center text-center w-full md:w-1/2 md:items-start md:text-left">
            <img
              src={ImageProfile}
              alt="Foto Profil"
              className="w-20 h-20 rounded-full object-cover border border-gray-300 mb-2"
            />
            <div>
              <p className="text-base text-gray-600">Selamat datang,</p>
              {profile ? (
                <h1 className="text-2xl font-bold text-gray-800">
                  {profile.first_name} {profile.last_name}
                </h1>
              ) : (
                <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
              )}
            </div>
          </div>
          <div
            className="text-white rounded-xl py-4 px-5 md:px-8 lg:px-12 w-full md:w-1/2 shadow-md bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/image/Background Saldo.png')`,
              backgroundPosition: "center 0px",
            }}
          >
            <p className="text-base mb-2">Saldo Anda</p>
            <p className="text-2xl font-bold mb-4">
              {showSaldo ? `Rp${saldo.balance.toLocaleString()}` : "Rp******"}
            </p>
            <button
              onClick={toggleSaldo}
              className="bg-white text-red-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              {showSaldo ? "Tutup Saldo" : "Lihat Saldo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
