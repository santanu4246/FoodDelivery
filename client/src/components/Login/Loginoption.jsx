import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import gsap from "gsap";

const Loginoption = ({ setLogin, setloginOptions }) => {
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    gsap.set(modalRef.current, {
      scale: 0.5,
      opacity: 0
    });

    gsap.set(overlayRef.current, {
      opacity: 0
    });

    gsap.set(buttonsRef.current, {
      y: 20,
      opacity: 0
    });


    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3
    })
    .to(modalRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    })
    .to(buttonsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.1
    });
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => setloginOptions(false)
    });

    tl.to(buttonsRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05
    })
    .to(modalRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.3
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.2
    });
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
    >
      <div 
        ref={modalRef}
        className="bg-white p-[1.5rem] rounded-lg shadow-md w-96 relative"
      >
        <RxCross2
          onClick={handleClose}
          className="absolute top-[10px] right-[10px] text-[18px] cursor-pointer hover:scale-110 transition-transform"
        />
        <div className="flex flex-col gap-3 mt-5">
          <button
            ref={el => buttonsRef.current[0] = el}
            onClick={() => {
              setLogin(true);
              handleClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 transition-colors"
          >
            Login as user
          </button>
          <button
            ref={el => buttonsRef.current[1] = el}
            onClick={() => {
              navigate("/admin");
              handleClose();
            }}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 transition-colors"
          >
            Login as admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginoption;