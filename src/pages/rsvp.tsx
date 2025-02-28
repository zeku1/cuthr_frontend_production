import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  emergencyContact: string;
  strand: string;
  schoolID: string;
}

const StarryNightForm: React.FC = () => {
  const API_BASE_URL = "http://128.199.126.75"
  const router = useRouter(); 

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    emergencyContact: "",
    strand: "",
    schoolID: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    let tempErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      tempErrors.firstName = "Only letters are allowed";
    }

    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
      tempErrors.lastName = "Only letters are allowed";
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      tempErrors.email = "Enter a valid email address";
    }

    if (!formData.contactNumber.match(/^09\d{9}$/)) {
      tempErrors.contactNumber = "Enter a valid 11-digit number";
    }

    if (!formData.emergencyContact.match(/^09\d{9}$/)) {
      tempErrors.emergencyContact = "Enter a valid 11-digit number";
    }

    if (!formData.strand) {
      tempErrors.strand = "Select a strand";
    }

    if (!formData.schoolID.match(/^\d{2}-\d{4}-\d{3}$/)) {
      tempErrors.schoolID = "Must be in format XX-XXXX-XXX";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Returns false if email OR school_id already exists in the database.
  const validateRSVP = async (): Promise<boolean> => {
    // Strip school_id format from XX-XXXX-XXX to XXXXXXXXX
    const strippedSchoolID = formData.schoolID.replace(/-/g, ''); 

    // Set variables for axios request
    const data = JSON.stringify({
      "email": formData.email,
      "school_id": strippedSchoolID,
    });

    const config = {
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity, 
    };

    // Attempt rsvp validation
    try {
      const response = await axios.post(API_BASE_URL + '/api/v1/rsvp-validate', data, config);
      // console.log(JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.log(error);
      
      // Displays "Email or id has been taken" to user page
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message; 
        displayErrorToUser(message);
      }
      return false;
    }
  };

  // TODO: Use JSON stringify instead of multiple localStorage
  const storeFormData = () => {
    localStorage.setItem("studentFirstname", formData.firstName);
    localStorage.setItem("studentLastname", formData.lastName);
    localStorage.setItem("studentEmail", formData.email);
    localStorage.setItem("studentContact", formData.contactNumber);
    localStorage.setItem("studentEmergencyContact", formData.emergencyContact);
    localStorage.setItem("studentStrand", formData.strand);

    const strippedSchoolID = formData.schoolID.replace(/-/g, ''); 
    localStorage.setItem("studentSchoolID", strippedSchoolID);
  }

  const displayErrorToUser = (message: string) => {
    if (message === "email is already used") {
      setErrors((prev) => ({ ...prev, email: "Email already registered" }));

    } else if (message === "school_id is already used") {
      setErrors((prev) => ({ ...prev, schoolID: "ID already registered" }));

    } else if (message === "email is already used and school_id is already used"){
      setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      setErrors((prev) => ({ ...prev, schoolID: "ID already registered" }));
    }
  }

  // Function is async to await RSVP validation.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const validateRSVPResult = await validateRSVP();  // RenameConsideration: isEmailOrIdUnique

    setLoading(true); // Unused

    if (validateRSVPResult) {
      localStorage.setItem("selectedStrand", formData.strand);
      storeFormData();
      router.push("/PaymentPage"); 
    }

    setLoading(false); // Unused
  };


  return (
    <div className="min-h-screen bg-[url('/RSVP/backgroundcuthr.png')] bg-cover bg-center flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md rounded-[25px] p-6 text-white text-center relative z-10 mt-40">
        <div className="w-3/4 flex justify-center absolute top-[-14%] left-1/2 transform -translate-x-1/2 mb-20">
          <img src="/RSVP/header.png" alt="RSVP Title" className="w-85%" />
        </div>

        <div className="w-full flex justify-center mt-20">
          <img src="/RSVP/Watermark.png" alt="CUTHR" className="w-3/4" />
        </div>
        <div className="w-full flex justify-center mt-4">
          <img src="/RSVP/RSVP_SSN.png" alt="Starry Night RSVP" className="w-3/4" />
        </div>
        <div className="w-full flex justify-center mt-4">
          <img src="/RSVP/date.svg" alt="Date" className="w-3/4" />
        </div>
        <p className="text-xs text-gray-300 mt-6">
          <img src="RSVP/Details.png" alt="Event Details" className="w-full" />
        </p>
      </div>

      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md rounded-[25px] p-4 text-white text-center mt-6">
        <p className="mt-4 text-xs text-gray-300">
          <img src="/RSVP/Prompt.png" alt="Form Prompt" className="w-full" />
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 mr-4 ml-4">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full" />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}

          <input type="tel" name="emergencyContact" placeholder="Emergency Contact Number" value={formData.emergencyContact} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full" />
          {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}

          {/* Strand */}
          <div className="relative">
            <select name="strand" value={formData.strand} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full appearance-none">
              <option value="">Strand</option>
              <option value="STEM">STEM</option>
              <option value="ABM">ABM</option>
              <option value="HUMSS">HUMSS</option>
              <option value="TVL">TVL/A&D</option>
            </select>
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
              <img src="/RSVP/Arrow.svg" alt="Dropdown Arrow" className="w-4 h-4" />
            </div>
          </div>
          {errors.strand && <p className="text-red-500 text-sm">{errors.strand}</p>}

          <input type="text" name="schoolID" placeholder="School ID (XX-XXXX-XXX)" value={formData.schoolID} onChange={handleChange} className="p-4 rounded-full bg-white text-black w-full" />
          {errors.schoolID && <p className="text-red-500 text-sm">{errors.schoolID}</p>}

          <button type="submit" className="bg-yellow-400 text-black py-4 rounded-full font-bold hover:bg-yellow-300 mb-6 disabled:opacity-50">Next</button>
        </form>
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