import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import withAuth from "../../components/withAuth";
import { AuthService } from '../../services/api/auth';

function UpdateViewPage() {
  const router = useRouter();
  const { studentId } = router.query; // Get the student ID from the URL

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Update time and date every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const dateString = now.toLocaleDateString([], { month: "numeric", day: "numeric", year: "2-digit" });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch student data only when router is ready and studentId is available
  useEffect(() => {

    const token = AuthService.getToken();

    const fetchStudentData = async (id: string) => {
      if (!id) {
        console.error("Invalid student ID:", id);
        return;
      }
    
      try {
        console.log("Fetching data for student ID:", id);
        const response = await fetch(`http://128.199.126.75/api/v1/admin/students/${id}/show`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
    
        const data = await response.json();
    
        if (response.status === 200) {
          setFormData(data.student);
          setIsVerified(data.student.verified === 1);
        } else {
          console.error(`Failed to fetch student data. Status: ${response.status}, Message: ${data.message}`);
          alert(`Failed to fetch student data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        alert("An error occurred while fetching student data.");
      }
    };

    if(token){
      fetchStudentData(studentId as string);
    }


  }, [router]);

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: "", // Clear the field when clicked
    }));
  };

  const handleToggle = () => {
    setIsModalOpen(true);
  };

  const confirmToggle = async () => {
    setIsModalOpen(false);
    if (!studentId) {
      alert("Student ID is not available.");
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      // Retrieve the CSRF token from cookies
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
      const response = await fetch(`http://128.199.126.75/api/v1/admin/students/${studentId}/verify`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken ? decodeURIComponent(csrfToken) : '',
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
        credentials: 'include',
      });
      const data = await response.json();
       
      console.log(data);

      if (response.status == 200) {
        alert("Student verification status updated successfully.");
        setIsVerified(!isVerified);
        setFormData(data.student);
      } else {
        console.error("Failed to verify student:", data.message);
        setIsVerified(!isVerified);
        alert("Failed to update student verification status.");
      }
    } catch (error) {
      console.error("Error verifying student:", error);
      alert("An error occurred while verifying the student.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF1E6] px-16 py-8">
      {/* Sidebar */}
      <div className="w-1/5">
        <div className="flex items-center space-x-4">
          <Image src="/assets/img/CUTHR-DGREEN.png" alt="CUTHR+ Logo" width={120} height={50} />
          <p className="text-green-700 text-sm">Hello! Had you have your coffee?</p>
        </div>
        <ul className="mt-6 space-y-4 text-green-700 font-bold text-sm">
          <li className="mb-2">Dashboard</li>
          <li>Add New Event</li>
          <li>User and Roles</li>
        </ul>
        <p className="mt-6 text-sm text-green-700 cursor-pointer">Sign out</p>
      </div>

      {/* Main Content */}
      <div className="w-4/5 pl-16">
        <div className="mt-12" />

        {/* Time & RSVP Status */}
        <div className="flex justify-between items-center w-full mb-8">
          <div className="text-left">
            <h1 className="text-green-700 font-black text-6xl">
              {currentTime} {currentDate}
            </h1>
            <p className="text-green-600 text-sm mt-1">RSVP Submitted</p>
          </div>

          {/* Verification Toggle */}
          <div className="text-right">
            <h2 className="text-green-700 font-black text-5xl">
              {isVerified ? "VERIFIED" : "NOT VERIFIED"}
            </h2>
            <div className="flex items-center mt-1">
              <p className="text-green-600 text-sm mr-2">Toggle to Verify</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" onChange={handleToggle} checked={isVerified} />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white peer-checked:bg-green-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* User Information Grid */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          {Object.keys(formData).map((field, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus(field)}
                className="w-full px-5 py-4 text-center bg-green-700 text-white rounded-full focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-12">
          <button className="text-gray-400 text-lg">CANCEL</button>
          <button className="text-green-700 text-lg font-bold">UPDATE</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-700 text-white px-10 py-8 rounded-lg text-center w-96">
            <p className="text-black text-lg mb-6">Verify this user?</p>
            <div className="flex justify-center space-x-10">
              <button onClick={() => setIsModalOpen(false)} className="text-black text-xl">
                NO
              </button>
              <button onClick={confirmToggle} className="text-black text-xl font-[Arboria-Black]">
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(UpdateViewPage);
