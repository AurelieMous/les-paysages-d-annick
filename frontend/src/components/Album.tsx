import cheval from "../assets/cheval.jpg"
export default function Album() {

    return (
        <>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <img
                            src={cheval}
                            alt="Camargue" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Camargue</h2>
                        <p>Ajouter une description</p>
                    </div>
                </div>
        </>
    )
}