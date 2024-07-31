import "./Animation.scss";
import bubble8 from "../../assets/bubble_8.svg";
import iedclogo from "../../assets/logo_1.svg";
import animation from "../../animations/landing.json";
import Lottie from "react-lottie";
import { signIn } from "../../Firebase/firebase";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth/Auth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";

const Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  const { profile } = useContext(ProjectContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const newprojectClick = async () => {
    setClicked(true);
    try {
      await signIn().then(()=> navigate('/projects'))
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <>
      <div className="animation_main">
        <div className="anime" data-aos="zoom-in" data-aos-duration="2000">
          <div className="title_2" data-aos="zoom-in" data-aos-duration="2000">
            IEDC MEC COLLAB
          </div>
          <img
            src={iedclogo}
            data-aos="zoom-in"
            data-aos-duration="2000"
            alt=""
            className="iedc_logo"
          />
          <img src={bubble8} alt="" className="bubble_8" />
          <Lottie
            animationData={animation}
            loop={true}
            autoPlay={true}
            options={defaultOptions}
          />
        </div>
        {profile ? (
          ""
        ) : (
          <div
            className="signin_btn"
            // data-aos="zoom-in"
            // data-aos-duration="2000"
            onClick={newprojectClick}
          >
            <FcGoogle size={35} /> Sign in with Google
          </div>
        )}
      </div>
    </>
  );
};
export default Animation;
