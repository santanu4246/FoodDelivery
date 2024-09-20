import React, { useState, useRef } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
const Login = ({setlogin}) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const otpInputRefs = useRef([]);

  const handleSendOtp = () => {
    if (email) {
      console.log("OTP sent to:", email);
      setOtpSent(true);
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      console.log("Entered OTP:", enteredOtp);
      alert('OTP Verified');
    } else {
      alert("Please enter the complete OTP.");
    }
  };

  const handleClose = () => {
    setOtpSent(false);
    setlogin(false);
    setEmail('');
    setOtp(new Array(4).fill(''));
  };

  const handleUndo = () => {
    setOtpSent(false);
    setOtp(new Array(4).fill(''));
    otpInputRefs.current[0]?.focus(); // Focus on the first input
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-[1.5rem] rounded-lg shadow-md w-96 relative">
        <button
          onClick={handleClose}
          className="absolute top-[15px] right-[15px] text-gray-500 hover:text-gray-800"
          title="Close"
        >
          <RxCross1 className='text-[20px]'/>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {!otpSent ? (
          <>
            <div className="mb-[1rem]">
              <label htmlFor="email" className="block font-[600] mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="otp" className="block font-[600] mb-2">Enter OTP</label>
              <div className="flex justify-between">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-[3rem] p-2 text-center border border-gray-300 rounded"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    ref={(el) => otpInputRefs.current[index] = el}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Verify OTP
            </button>
            <button
              onClick={handleUndo}
              className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-300 flex items-center justify-center"
            >
              <IoMdArrowRoundBack className="mr-2 text-[20px]" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;