import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getCustomService, ServiceItem } from "../../api/service";
import { useNavigate } from "react-router-dom";

const ServicesSection: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [customServices, setCustomeServices] = useState<ServiceItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const cached = localStorage.getItem("services");
      const cachedTime = localStorage.getItem("servicesExpired");

      const oneDay = 24 * 60 * 60 * 1000;
      const now = Date.now();

      if (cached && cachedTime) {
        const age = now - parseInt(cachedTime);
        if (age < oneDay) {
          setCustomeServices(JSON.parse(cached));
          return;
        } else {
          localStorage.removeItem("services");
          localStorage.removeItem("servicesExpired");
        }
      }

      if (!token) return;
      const result = await getCustomService(token);
      setCustomeServices(result);
      localStorage.setItem("services", JSON.stringify(result));
      localStorage.setItem("servicesExpired", now.toString());
    };

    fetchData();
  }, [token]);

  const handleClick = (service: ServiceItem) => {
    navigate(`/services/${service.service_code}`);
  };

  return (
    <div className="w-full mt-6 mb-3 px-6">
      <h2 className="text-base font-semibold text-gray-800 mb-8 text-center">
        Daftar Layanan Pembayaran
      </h2>
      <div className="flex justify-evenly flex-wrap gap-y-4 text-center text-xs">
        {customServices.map((service, i) => (
          <button
            key={i}
            onClick={() => handleClick(service)}
            className="flex flex-col items-center w-20 focus:outline-none"
          >
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm mb-1">
              <img
                src={service.image || ""}
                alt={service.name || service.service_name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-xs text-center">
              {service.name || service.service_name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
