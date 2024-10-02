import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="h-[65vh] w-[100%] bg-[#F8F8F8] px-[15%] py-5">
      <div className="flex justify-between">
        <h2>FoodForYou</h2>
        <div className="flex gap-5">
          <span>India</span>
          <span>English</span>
        </div>
      </div>

      <div className="flex justify-between py-10">
        <div className="">
          <h2 className="uppercase ">About FoodForYou</h2>
          <div className="py-4 flex flex-col gap-1">
            <span>
              <li>Who We Are</li>
            </span>
            <span>
              <li>Blog</li>
            </span>
            <span>
              <li>Work With Us</li>
            </span>
            <span>
              <li>Investor Relations</li>
            </span>
            <span>
              <li>Report Fraud</li>
            </span>
            <span>
              <li>Press Kit</li>
            </span>
            <span>
              <li>Contact Us</li>
            </span>
          </div>
        </div>

        <div className="">
          <h2 className="uppercase ">FoodForYouVerse</h2>
          <div className="py-4 flex flex-col gap-1">
            <span>
              <li>Who We Are</li>
            </span>
            <span>
              <li>Blog</li>
            </span>
            <span>
              <li>Work With Us</li>
            </span>
            <span>
              <li>Investor Relations</li>
            </span>
            <span>
              <li>Report Fraud</li>
            </span>
            <span>
              <li>Press Kit</li>
            </span>
            <span>
              <li>Contact Us</li>
            </span>
          </div>
        </div>

        <div className="">
          <h2 className="uppercase ">For Restaurants</h2>
          <div className="py-4 flex flex-col gap-1">
            <span>
              <li>Partner With Us</li>
            </span>
            <span>
              <li>Apps For You</li>
            </span>
          </div>
        </div>

        <div className="">
          <h2 className="uppercase ">Learn More</h2>
          <div className="py-4 flex flex-col gap-1">
            <span>
              <li>Privacy</li>
            </span>
            <span>
              <li>Security</li>
            </span>
            <span>
              <li>Terms</li>
            </span>
          </div>
        </div>

        <div className="">
          <h3 className="uppercase">Social Links</h3>
          <div className="flex py-5 gap-2">
          <span className="p-[5px] bg-black text-white rounded-[50%]"><FaLinkedin/></span>
          <span className="p-[5px] bg-black text-white rounded-[50%]"><FaInstagram/></span>
          <span className="p-[5px] bg-black text-white rounded-[50%]"><FaSquareXTwitter/></span>
          <span className="p-[5px] bg-black text-white rounded-[50%]"><FaYoutube/></span>
          <span className="p-[5px] bg-black text-white rounded-[50%]"><FaFacebookF/></span>
          </div>
        </div>

        
      </div>
      <div className="line w-[100%] bg-black h-[1px] mb-[20px]"></div>
      <span className="">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © FoodForYou Ltd. All rights reserved.</span>
    </div>
  );
};

export default Footer;
