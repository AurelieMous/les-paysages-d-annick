import  logo from "../assets/logo.png"
import {CiMenuBurger} from "react-icons/ci";
import {AiFillFacebook, AiFillInstagram} from "react-icons/ai";

export default function Header() {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <CiMenuBurger />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Albums photo</a></li>
                            <li><a>À propos</a></li>
                            <li><a>Prestations</a></li>
                            <li><a>Contact</a></li>
                        </ul>
                    </div>
                    <img src={logo} className="w-auto h-36" alt={"Les paysages d'Annick"} />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Albums photo</a></li>
                        <li><a>À propos</a></li>
                        <li><a>Prestations</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="grid grid-flow-col gap-4 text-3xl">
                        <a aria-label="Facebook" target="_blank" href={"https://www.facebook.com/les.paysages.d.Annick" } ><AiFillFacebook /></a>
                        <a aria-label="Instagram" target="_blank" href={""}><AiFillInstagram /></a>
                    </div>
                </div>
            </div>
        </>
    );
}