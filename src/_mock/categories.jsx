import { FaHandHoldingWater, FaHeart, FaSpa } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { IoBody } from "react-icons/io5";
import { MdOutlineFace2 } from "react-icons/md";
import { drops, pool, sauna, treatement } from "../assets/spa-icons";

export const CATEGORIES = [
    {title: "Coup de coeur", icon: <FaHeart />, link: "#"},
    {title: "Visage", icon: <MdOutlineFace2 />, link: "#"},
    {title: "Corps", icon: <IoBody />, link: "#"},
    {title: "SPA", icon: <FaSpa />, link: "#"},
    {title: "Ritules", icon: <FaHandHoldingWater />, link: "#"},
    {title: "Séjour", icon: <IoMdBed />, link: "#"},
]

export const SERVICES_LIST = [
    {title: "Sauna", icon: <img lazyload="lazy" src={sauna} />},
    {title: "Piscine", icon: <img lazyload="lazy" src={pool} />},
    {title: "Treatement", icon: <img lazyload="lazy" src={treatement} />},
    {title: "Hammam", icon: <img lazyload="lazy" src={drops} />},
]