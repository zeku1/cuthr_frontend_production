import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


interface FormData {
  transactionNo: string; // RenameConsider: transactionNumber
}

const StarryNightForm = () => {
  const API_BASE_URL = "http://128.199.126.75"
  const router = useRouter(); 

  const [qrCode, setQrCode] = useState("/RSVP/QRcode.png"); // Default QR code

  const [formData, setFormData] = useState<FormData>({
    transactionNo: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({}); 

  useEffect(() => {
    const selectedStrand = localStorage.getItem("selectedStrand");

    if (selectedStrand) {
      const strandQRMap: { [key: string]: string } = {
        STEM: "/RSVP/STEM.png",
        ABM: "/RSVP/ABM.png",
        HUMSS: "/RSVP/HUMSS.png",
        TVL: "/RSVP/TVL.png",
      };

      setQrCode(strandQRMap[selectedStrand] || "/RSVP/QRcode.png");
    }
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeLocalStorageData = (): void => { 
    // TODO: Use JSON stringify instead. 
    localStorage.removeItem("studentFirstname");
    localStorage.removeItem("studentLastname");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentContact");
    localStorage.removeItem("studentEmergencyContact");
    localStorage.removeItem("studentStrand");
    localStorage.removeItem("studentSchoolID");   
    // console.log("Removed localStorage");  
  }

  // TODO: Use JSON stringify instead
  const saveRSVP = async (): Promise<boolean> => { 
    try {
      // --- Set Variables
      let str: string | null = localStorage.getItem("studentSchoolID");
      let schoolIDInt = parseInt(str ?? ""); // If str is null, use an empty string as fallback
  
      let data = JSON.stringify({
        "first_name": localStorage.getItem("studentFirstname"),
        "last_name": localStorage.getItem("studentLastname"),
        "email": localStorage.getItem("studentEmail"),
        "contact": localStorage.getItem("studentContact"),
        "emergency_contact": localStorage.getItem("studentEmergencyContact"),
        "strand": localStorage.getItem("studentStrand"),
        "school_id": schoolIDInt, // int
        "transaction_number": formData.transactionNo, // int
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API_BASE_URL + '/api/v1/rsvp',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
        },
        data: data
      };

      // --- Run RSVP request
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
  
      // Request successful
      return true;
  
    } catch (error) {
      // Displays "Transaction already exists" error to user frontend
      // * Workaround:
      //    We have no "transaction number exists" API endpoint error code.
      //    This should be a separate method instead of being inside saveRSVP(). 
      //    Using this for now. 
      let tempErrors: Partial<FormData> = {};
      tempErrors.transactionNo = "Transaction number already registered";
      setErrors(tempErrors);
      
      console.error(error);
      return false;
    }
  };

  // Progam should only accept 12 - 13 digit numbers.
  //    Gcash - 12-digit numbers
  //    Gcash (bank transfers) - 13-digit numbers
  const validateTransactionFormat = (): boolean => {
    let tempErrors: Partial<FormData> = {};

    // Accept 12-digit or 13-digit transaction numbers
    if (!formData.transactionNo.match(/^\d{12,13}$/)) {
      tempErrors.transactionNo = "Please enter a valid 12-digit number";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();
    if (validateTransactionFormat()){
      // Attempt to save RSVP
      let isRsvpSaved = await saveRSVP();

      if (isRsvpSaved){  // RSVP Success
        removeLocalStorageData();
        router.push("/thankyoupage"); 
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-[url('/RSVP/backgroundcuthr.png')] bg-cover bg-center flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md rounded-[25px] p-6 text-white text-center relative z-10 mt-40">
        <div className="w-3/4 flex justify-center absolute top-[-10%] left-1/2 transform -translate-x-1/2">
          <img src="/RSVP/header.png" alt="RSVP Title" className="w-85%" />
        </div>

        <div className="w-full flex justify-center mt-20">
          <img src="/RSVP/PaymentPrompt.png" alt="Prompt and actions" className="w-full" />
        </div>

        <div className="w-full flex justify-center mt-4">
          <img src={qrCode} alt="QR code" className="w-3/4" />
        </div>

        <p className="mt-4 text-xs text-gray-300 mt-6 ml-10 mr-10">
          <img src="/RSVP/Lastly.png" alt="Prompt" className="w-full" />
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 mr-4 ml-4">
          <input
            type="text"
            name="transactionNo"
            placeholder="Transaction Number"
            value={formData.transactionNo} 
            onChange={handleChange}
            className="p-4 rounded-full bg-white text-black w-full"
          />
          {errors.transactionNo && <p className="text-red-500 text-sm">{errors.transactionNo}</p>}


          <button type="submit" className="bg-yellow-400 text-black py-4 rounded-full font-bold hover:bg-yellow-300 mb-6">
            Submit
          </button>
        </form>

        <div className="w-full flex justify-center mt-4">
          <img src="/RSVP/Reminder.png" alt="Reminder" className="w-full" />
        </div>
      </div>

      <div className="w-full max-w-md flex justify-start mt-2">
        <button onClick={() => window.history.back()} className="focus:outline-none">
          <img src="/RSVP/BackButton.png" alt="Back" className="w-24" />
        </button>
      </div>

      <div className="w-full max-w-md rounded-[25px] p-4 text-white text-center mt-6">
        <div className="w-full flex justify-center mt-6">
          <img src="/RSVP/WatermarkDark.png" alt="CUTHR" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default StarryNightForm;