import React from "react";

const StarryNightForm = () => {
  return (
    <div className="min-h-screen bg-[url('/RSVP/backgroundcuthr.png')] bg-cover bg-center flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md rounded-[25px] p-6 text-white text-center relative z-10 mt-40">

        <div className="w-3/4 flex justify-center absolute top-[-20%] left-1/2 transform -translate-x-1/2">
          <img src="/RSVP/headerv2.png" alt="RSVP Title" className="w-85%" />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="w-full flex justify-center mt-20">
          <img src="/RSVP/TyPrompt.png" alt="Prompt and actions" className="w-4/4" />
        </div>
        <p className="mt-4 text-xs text-gray-300 mt-6 ml-10 mr-10">
          <img src="/RSVP/Thankyou.png" alt="Prompt" className="w-full" />
        </p>
        <div className="w-full flex justify-center mt-4">
          <img src="/RSVP/Note.png" alt="Reminder" className="w-4/4" />
        </div>


        <div className="w-full flex justify-center mt-6 mb-6">
          <a
            href="/event-guideline.pdf"
            download="Event_Guideline.pdf"
            className="bg-yellow-400 text-black font-bold py-4 px-6 rounded-full hover:bg-yellow-300 transition"
          >
            Download Event Guideline
          </a>
        </div>
      </div>

      <div className="w-full max-w-md rounded-[25px] p-4 text-white text-center mt-6">
        <div className="w-full flex justify-center mt-6">
          <img src="/RSVP/WatermarkDark.png" alt="CUTHER" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default StarryNightForm;
