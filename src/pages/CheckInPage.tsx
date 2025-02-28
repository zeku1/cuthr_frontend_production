// pages/checkin.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import axiosInstance from '../services/api/axiosConfig';
import { AuthService } from '../services/api/auth';
import withAuth from '../components/withAuth'; // Import the withAuth HOC

function CheckInPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const dateString = now.toLocaleDateString([], { month: "numeric", day: "numeric", year: "2-digit" });

      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, [router]);

  const handleCheckIn = async () => {
    try {
      await axiosInstance.post('/checkin', {
        // checkin data
      });
      // Handle successful check-in
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-custom-green px-6 py-12">
      {/* Header */}
      <div className="flex justify-between w-full max-w-md mb-10">
        <Image src="/assets/img/CUTHR-DGREEN.png" alt="CUTHR+ Logo" width={100} height={40} />
        <button className="text-[#1D8E42] text-lg font-book focus:outline-none" onClick={() => alert("Menu clicked!")}>
          MENU
        </button>
      </div>

      {/* Time & Date */}
      <div className="text-center mt-12 relative">
        <h1 className="text-green-700 font-black text-5xl">{currentTime} {currentDate}</h1>
        <p className="absolute right-0 bottom-[-22px] text-[#1D8E42] text-xs">RSVP Submitted</p>
      </div>

      {/* Verification Status */}
      <div className="relative mt-12 text-center">
        <h2 className="text-green-700 font-black text-5xl">VERIFIED</h2>
        <p className="absolute right-0 bottom-[-22px] text-[#1D8E42] text-xs">{currentDate}</p>
      </div>

      {/* User Details */}
      <div className="w-full max-w-md mt-14 space-y-12">
        {[
          { label: "First Name", type: "text", placeholder: "First name" },
          { label: "Last Name", type: "text", placeholder: "Last name" },
          { label: "Gender", type: "text", placeholder: "Gender" },
          { label: "Strand", type: "text", placeholder: "Strand" },
          { label: "Email", type: "email", placeholder: "Email" },
          { label: "School ID", type: "text", placeholder: "ID number" },
          { label: "Contact", type: "text", placeholder: "Contact number" },
        ].map(({ label, type, placeholder }, index) => (
          <div key={index} className="relative w-full">
            <input
              type={type}
              placeholder={placeholder}
              className="w-full px-5 py-4 text-center bg-[#1D8E42] text-[#E2EAE2] placeholder-[#E2EAE2] rounded-full focus:outline-none"
            />
            <p className="absolute left-4 bottom-[-22px] text-[#1D8E42] text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* CHECK-IN & REJECT Buttons */}
      <div className="w-full max-w-md mt-16 flex flex-col items-center space-y-3">
        <button className="w-full py-1 text-[#1D8E42] text-4xl font-black bg-transparent" onClick={handleCheckIn}>
          CHECK-IN
        </button>
        <button className="w-full py-4 text-[#1D8E42] text-lg font-normal bg-transparent">
          REJECT
        </button>
      </div>
    </div>
  );
}

export default withAuth(CheckInPage);
