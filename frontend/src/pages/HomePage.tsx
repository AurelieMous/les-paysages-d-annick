import Album from "../components/Album.tsx";
import {useEffect, useState} from "react";
import getAPI from "../fetch/getAPI.ts";
import type {IAlbums} from "../@types/Albums";

export default function HomePage() {
    const [albums, setAlbums] = useState<IAlbums[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<null | String>(null);

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
            <div className="flex flex-col items-center justify-center gap-4 pt-4 pb-4 ">
                <h1 className="text-3xl" >Bienvenue</h1>
                <p>Description du site</p>
            </div>
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

        </>
)
    ;
}