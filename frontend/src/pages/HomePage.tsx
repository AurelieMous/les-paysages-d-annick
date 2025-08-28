import Album from "../components/Album.tsx";
import {useEffect, useState} from "react";
import getAPI from "../fetch/getAPI.ts";
import type {IAlbums} from "../@types/Albums";
import cheval from "../assets/cheval.jpg";
import cascade from "../assets/cascade.jpg";
import pot from "../assets/pot.jpg";
import { motion } from "motion/react";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const [albums, setAlbums] = useState<IAlbums[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<null | String>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async() => {
            setLoading(true)
            setError(null)
            try {
                const response = await getAPI('/albums');
                setAlbums(response.data);
            } catch (error) {
                setError("Erreur lors de la récupération des données");
            } finally {
                setLoading(false)
            }
        }
        fetchAlbums();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 pt-10 pb-8  w-full">
                <h1 className="text-3xl font-serif text-center max-w-4xl italic">
                    "Capturer l'instant, c'est voler un peu d'éternité au temps qui passe."
                </h1>
                <p className="max-w-2xl px-4">
                    Bienvenue dans ma galerie d'émotions capturées. Ici, la photographie devient langage universel :
                    paysages époustouflants de mes voyages, portraits authentiques, street art urbain,
                    nature dans ses moindres détails... Chaque image raconte une histoire, chaque clic
                    fige un souvenir.
                </p>
            </div>
            <section>
                {error && (
                    <div className="flex flex-wrap justify-center gap-8 pb-8 text-red-500">{error}</div>
                )}
                {loading ? (
                    <div className="flex flex-wrap justify-center gap-8 pb-8">
                        Ajout d'un loader ici
                    </div>
                ):(
                    <div className="flex flex-wrap justify-center gap-8 pb-8">
                        { albums.map((album: IAlbums) => (
                            <div>
                                <Album albums={album} key={album.id} />
                            </div>
                        ))}
                    </div>
                )}
                {/* TODO A supprimer quand les images seront en backend */}
                <div className="flex flex-wrap justify-center gap-8 pb-8">

                    <motion.div
                        className="card bg-base-100 w-96 shadow-sm cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            y: -10,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {navigate("/details")}}
                    >
                        <figure>
                            <img
                                src={cheval}
                                alt="Camargue"
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Camargue</h2>
                            <p>Ajouter une description</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="card bg-base-100 w-96 shadow-sm cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            y: -10,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <figure>
                            <img
                                src={cascade}
                                alt="Camargue"
                                className="w-full h-64 object-cover"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Camargue</h2>
                            <p>Ajouter une description</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="card bg-base-100 w-96 shadow-sm cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            y: -10,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <figure>
                            <img
                                src={pot}
                                alt="Camargue"
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Camargue</h2>
                            <p>Ajouter une description</p>
                        </div>
                    </motion.div>
                </div>
            </section>



        </>
)
    ;
}