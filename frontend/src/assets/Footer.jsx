import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-black py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-600 text-[.9rem] font-normal">
          <div>
            <Link to={"/"} className="text-tempCol font-bold text-[2rem] ">
              GetHired
            </Link>
            <p className=" mt-2">
              Your dream job is within reach when preparation meets opportunity.
              Let's make your career aspirations a reality.
            </p>
            <div className=" mt-2">
              <span className=" mr-1 hover:text-tempCol duration-200">
                <i class="fa-brands fa-instagram"></i>
              </span>
              <span className=" mx-1 hover:text-tempCol duration-200">
                <i class="fa-brands fa-youtube"></i>
              </span>
              <span className=" mx-1 hover:text-tempCol duration-200">
                <i class="fa-brands fa-x-twitter"></i>
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-black text-[1.3rem]">Company</h2>
            <ul>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                About
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Pricing
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Blog
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Careers
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-black text-[1.3rem]">Support</h2>
            <ul>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Help and Support
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Become Instructor
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Get the app
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                FAQ’s
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Tutorial
              </li>
              <li className=" hover:text-tempCol duration-200 cursor-pointer">
                Get in touch
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4 text-black text-[1.3rem]">Contact</h2>
            <address>
              339 McDermott Points Hettingerhaven, NV 15283
              <br />
              Email:{" "}
              <a href="mailto:support@geeksui.com" className="text-blue-500">
                support@geeksui.com
              </a>
              <br />
              Phone: (000) 123 456 789
            </address>
          </div>
        </div>
        <div className="text-center mt-16 flex justify-between  border-t border-gray-300 pt-5 text-gray-500 text-[.9rem] font-normal">
          <p>© 2023 Geeks-UI, Inc. All Rights Reserved</p>
          <ul className=" flex">
            <li className=" px-3 hover:text-tempCol duration-200 cursor-pointer">
              Privacy Policy
            </li>
            <li className=" px-3 hover:text-tempCol duration-200 cursor-pointer">
              Cookie Notice
            </li>
            <li className=" px-3 hover:text-tempCol duration-200 cursor-pointer">
              Do Not Sell My Personal Information
            </li>
            <li className=" px-3 hover:text-tempCol duration-200 cursor-pointer">
              Terms of Use
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
