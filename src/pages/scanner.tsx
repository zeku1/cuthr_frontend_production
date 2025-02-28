"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";
import withAuth from "../components/withAuth";

const Scanner = () => {
  const [scannerActive, setScannerActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const [usedTix, setUsedTix] = useState<{ [key: string]: string }>({});
  const [qrData, setQrData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("tix");

  const router = useRouter();

  useEffect(() => {
    if (!scannerActive || !hasCameraPermission) return;
  
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
  
    function handleScan(decodedText: string) {
      setScannerActive(false);
  
      if (usedTix[tab] !== decodedText) {
        if (tab === "tix") {
          setUsedTix((prev) => ({ ...prev, tix: decodedText }));
          fetch(`http://localhost/api/v1/admin/students/${decodedText}/check-in`, { method: "POST" })
            .then(() => router.push(`/CheckInPage`))
            .catch((error) => {
              console.error("Error checking in student:", error);
              alert("Failed to check in student.");
            });
        } else if (tab === "food") {
          setUsedTix((prev) => ({ ...prev, food: decodedText }));
          fetch(`http://localhost/api/v1/admin/students/${decodedText}/claim-food`, { method: "POST" })
            .then(() => alert("Food claimed successfully!"))
            .catch((error) => {
              console.error("Error claiming food:", error);
              alert("Failed to claim food.");
            });
        } else if (tab === "photobooth") {
          setUsedTix((prev) => ({ ...prev, photobooth: decodedText }));
          fetch(`http://localhost/api/v1/admin/students/${decodedText}/photo-snap`, { method: "POST" })
            .then(() => alert("Photobooth access granted!"))
            .catch((error) => {
              console.error("Error accessing photobooth:", error);
              alert("Failed to access photobooth.");
            });
        }
      } else {
        setQrData(decodedText);
        setIsModalOpen(true);
      }
    }
  
    scanner.render(handleScan, (errorMessage) => {
      console.error("QR Scan Error:", errorMessage);
    });
  
    return () => {
      scanner.clear();
    };
  }, [scannerActive, hasCameraPermission, tab]);
  
  
  const requestCameraPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setHasCameraPermission(true);
        setScannerActive(true);
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      setHasCameraPermission(false);
    }
  };

  const handleAccept = () => {
    setIsModalOpen(false);
    alert(`Confirmed for ${tab}!`);
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-black text-white font-arboria">
      {hasCameraPermission ? (
        <>
          <div id="qr-reader" className={`absolute top-0 left-0 w-full h-1/2 ${!scannerActive ? "hidden" : ""}`}></div>
          <div className="absolute top-1/2 flex gap-3">
            <button className={`px-4 py-2 rounded-full text-sm font-bold ${tab === "tix" ? "bg-[#5EF073]" : "bg-[#27692D]"}`} onClick={() => setTab("tix")}>
              TIX
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-bold ${tab === "food" ? "bg-[#5EF073]" : "bg-[#27692D]"}`} onClick={() => setTab("food")}>
              FOOD STAMP
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-bold ${tab === "photobooth" ? "bg-[#5EF073]" : "bg-[#27692D]"}`} onClick={() => setTab("photobooth")}>
              PHOTOBOOTH
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <img src="/images/cuthr.png" alt="CUTHR+" className="h-10" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <button
            className="px-6 py-3 text-lg font-bold bg-[#5EF073] text-black rounded-lg"
            onClick={requestCameraPermissions}
          >
            Request Camera Access
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-80 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold">Tix for {tab}</h2>
            <p className="mt-2">Please confirm ticket</p>
            <div className="mt-4 flex gap-3">
              <button className="px-6 py-3 bg-gray-500 text-white rounded-full" onClick={() => { setIsModalOpen(false); setScannerActive(true); }}>
                Reject
              </button>
              <button className="px-6 py-3 bg-green-500 text-white rounded-full" onClick={handleAccept}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
    
  );

};

export default withAuth(Scanner);