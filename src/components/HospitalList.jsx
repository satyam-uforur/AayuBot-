import { MapPin, Clock } from "lucide-react";

export function HospitalList({ hospitals }) {
  if (!hospitals || hospitals.length === 0) return null; // Handle empty or undefined cases

  return (
    <div className="w-full max-w-2xl space-y-4">
      {hospitals.map((hospital) => (
        <div
          key={hospital.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {hospital.name}
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{hospital.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={18} className="mr-2" />
              <span>{(hospital.distance / 1000).toFixed(2)} km away</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HospitalList;
