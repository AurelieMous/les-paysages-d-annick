import cheval from "../assets/cheval.jpg"
import type {IAlbums} from "../@types/Albums";
import { motion } from "motion/react"
import {useNavigate} from "react-router-dom";

interface AlbumsProps {
    albums : IAlbums;
    key : number;
}

export default function Album({albums} : AlbumsProps) {
    const navigate = useNavigate();

    return (
        <>
                <motion.div
                    className="card bg-base-100 w-96 shadow-sm cursor-pointer"
                    whileHover={{
                        scale: 1.05,
                        y: -10,
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {navigate("/")}}
                >
                    <figure>
                        <img
                            src={cheval}
                            alt="Camargue"
                            className="w-full h-64 object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Camargue {albums.title}</h2>
                        <p>Ajouter une description {albums.description}</p>
                    </div>
                </motion.div>
        </>
    )
}