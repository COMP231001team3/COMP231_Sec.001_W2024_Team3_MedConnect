import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./footer.css";
import logo from "./logo.png";

{
  /*the footer of the application*/
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container p-2">
        <div className="row">
          <div className="col-md-3">
            <div className="footerImg">
              <img src={logo} alt="Logo" width="115" height="95" />
              <p className="text-gray">Copyright</p>
            </div>
          </div>
          <div className="col-md-3">
            <h5 className="text-black">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a className="text-gray" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="text-gray" href="/">
                  Blog
                </a>
              </li>
              <li>
                <a className="text-gray" href="/">
                  News
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-black">About</h5>
            <ul className="list-unstyled">
              <li>
                <a className="text-gray" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="text-gray" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="text-gray" href="#">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-black">Contact</h5>
            <p className="text-gray">
              Contact
              <br />
              Somewhere Rd, Toronto, ON, Canada L1G 6Y7
              <br />
              111-222-3456
              <br />
              <a href="mailto:contact@medconnet.ca" className="text-gray">
                contact@medconnet.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
