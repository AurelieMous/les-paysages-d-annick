import Album from "../components/Album.tsx";

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 pb-4 ">
                <h1 className="text-3xl" >Bienvenu</h1>
                <p>Description du site</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pb-8">
                {/*{ albums.map((album, index) => (
                <div>
                    <Album album={album} key={index} />
                <div>
                ))}*/}
                <div ><Album/></div>
                <div ><Album/></div>
                <div ><Album/></div>
                <div ><Album/></div>
            </div>
        </>
)
    ;
}