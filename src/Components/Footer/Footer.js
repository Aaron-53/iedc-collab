import "./Footer.scss";
import bubble6 from "../../assets/bubble_6.svg";
import bubble7 from "../../assets/bubble_7.svg";
import { HiMail } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
// import { GoMarkGithub } from "react-icons/go";
const Footer = () => {
  return (
    <>
      <div className="footer_main">
        <img src={bubble6} alt="" className="bubble_6" />
        <div className="footer__content">
          <div className="footer_icons">
            <a href={`mailto: iedc@mec.ac.in`}>
              <HiMail color="white" size={37} />
            </a>
            <a href="https://www.linkedin.com/company/iedcmec/">
              <FaLinkedin color="white" size={28} />
            </a>
            {/* <a href="https://github.com/IEDCMEC">
              <GoMarkGithub color="white" size={28} />
            </a> */}
          </div>
          <div className="footer__made">Made with ❤️ IEDC MEC 2024</div>
        </div>
        <img src={bubble7} alt="" className="bubble_7" />
      </div>
    </>
  );
};
export default Footer;
