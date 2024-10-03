import React from "react";
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#F8F8F8] px-6 py-10 lg:px-24 lg:py-16">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
        <h2 className="text-2xl font-bold mb-4 lg:mb-0">FoodForYou</h2>
        <div className="flex gap-5">
          <span>India</span>
          <span>English</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-0">
        {/* Column 1: About */}
        <div className="w-full lg:w-1/5">
          <h2 className="uppercase font-semibold mb-4">About FoodForYou</h2>
          <ul className="flex flex-col gap-2">
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relations</li>
            <li>Report Fraud</li>
            <li>Press Kit</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 2: FoodForYouVerse */}
        <div className="w-full lg:w-1/5">
          <h2 className="uppercase font-semibold mb-4">FoodForYouVerse</h2>
          <ul className="flex flex-col gap-2">
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relations</li>
            <li>Report Fraud</li>
            <li>Press Kit</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 3: For Restaurants */}
        <div className="w-full lg:w-1/5">
          <h2 className="uppercase font-semibold mb-4">For Restaurants</h2>
          <ul className="flex flex-col gap-2">
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
        </div>

        {/* Column 4: Learn More */}
        <div className="w-full lg:w-1/5">
          <h2 className="uppercase font-semibold mb-4">Learn More</h2>
          <ul className="flex flex-col gap-2">
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
          </ul>
        </div>

        {/* Column 5: Social Links */}
        <div className="w-full lg:w-1/5">
          <h3 className="uppercase font-semibold mb-4">Social Links</h3>
          <div className="flex gap-3">
            <span className="p-2 bg-black text-white rounded-full">
              <FaLinkedin />
            </span>
            <span className="p-2 bg-black text-white rounded-full">
              <FaInstagram />
            </span>
            <span className="p-2 bg-black text-white rounded-full">
              <FaTwitter />
            </span>
            <span className="p-2 bg-black text-white rounded-full">
              <FaYoutube />
            </span>
            <span className="p-2 bg-black text-white rounded-full">
              <FaFacebookF />
            </span>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="w-full bg-black h-[1px] my-8"></div>
      <span className="text-sm text-gray-600 block text-center">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © FoodForYou Ltd. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
