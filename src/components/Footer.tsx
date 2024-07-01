import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaLocationDot,
} from "react-icons/fa6";
import { MdMail } from "react-icons/md";
function Footer() {
  return (
    <footer className="h-[310px] w-full bg-[#4A5972]">
      <div className="flex">
        <div className="flex flex-col p-[40px] gap-[15px]">
          <div>
            <img
              className="h-[95px] w-[200px] "
              src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_white.svg"
              alt="logo"
            />
          </div>
          <div>
            <div className="flex justify-normal gap-3">
              <FaFacebookF className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
              <FaXTwitter className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
              <FaInstagram className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
              <FaYoutube className="text-[#B7A896] text-xl hover:text-white transform transition-transform hover:scale-110" />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-[40px] gap-[15px]">
          <h3 className="font-bold text-xl text-[#B7A896] ">Menu</h3>
          <div className="flex flex-col gap-4 pt-4">
            <li className="list-none m-0 p-0 text-white mr-7 ">Actualités</li>
            <li className="list-none m-0 p-0 text-white mr-7 ">Départements</li>
            <li className="list-none m-0 p-0 text-white mr-7 ">Province</li>
            <li className="list-none m-0 p-0 text-white mr-7 ">
              Appels d’offres et concours
            </li>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-[40px] gap-[15px]">
          <h3 className="font-bold text-xl text-[#B7A896]">Contactez-Nous</h3>
          <div>
            <ul className="flex flex-col justify-start items-start gap-5 pt-4">
              <li>
                <a
                  className="flex gap-2 "
                  href="https://www.google.com/maps/place/Minist%C3%A8re+de+la+Jeunesse+et+des+Sports/@33.9926654,-6.8533756,17z/data=!3m1!4b1!4m5!3m4!1s0xda76c915fde88b9:0x21f0ab8402138a79!8m2!3d33.992661!4d-6.8511869?hl=fr-FR"
                >
                  <FaLocationDot className="text-[#B7A896] text-xl" />
                  <span className="text-white text-[15px]">
                    JEUNESSE : Avenue Ibn Sina, Rabat - 0537770419
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="flex gap-2 "
                  href="https://www.google.com/maps/place/Minist%C3%A8re+de+la+culture/@34.0199721,-6.8362564,17z/data=!3m1!4b1!4m5!3m4!1s0xda76b88119d8e55:0x26e16313ba43f7df!8m2!3d34.0199746!4d-6.8340524?hl=fr-FR"
                >
                  <FaLocationDot className="text-[#B7A896] text-xl" />
                  <span className="text-white text-[15px]">
                    CULTURE : 1, Rue Ghandi, Rabat - 0537209400
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="flex gap-2 "
                  href="https://www.google.com/maps/place/Minist%C3%A8re+de+la+Communication/@33.984018,-6.864127,15z/data=!4m5!3m4!1s0x0:0x5394ea9bb6a1f34!8m2!3d33.9840182!4d-6.864127?hl=fr"
                >
                  <FaLocationDot className="text-[#B7A896] text-xl" />
                  <span className="text-white text-[15px]">
                    COMMUNICATION : Avenue Allal El Fassi, Al Irfane, Rabat -
                    0537774274
                  </span>
                </a>
              </li>
              <li>
                <a className="flex gap-2 " href="mailto:contact@mjcc.gov.ma">
                  <MdMail className="text-[#B7A896] text-xl" />
                  <span className="text-white text-[15px]">
                    contact@mjcc.gov.ma
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
