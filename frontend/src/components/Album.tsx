import cheval from "../assets/cheval.jpg"
import type {IAlbums} from "../@types/Albums";

interface AlbumsProps {
    albums : IAlbums;
    key : number;
}

export default function Album({albums} : AlbumsProps) {

    return (
        <>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                            src={cheval}
                            alt="Camargue" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Camargue {albums.title}</h2>
                        <p>Ajouter une description {albums.description}</p>
                    </div>
                </div>
        </>
    )
}