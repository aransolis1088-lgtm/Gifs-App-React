import GifList from "./gifs/components/GifList";
import PreviousSearches from "./gifs/components/PreviousSearches";
import CustomHeader from "./shared/components/CustomHeader";
import SearchBar from "./shared/components/SearchBar";
import useGifs from "./gifs/hooks/useGifs";

export const GifsApp = () => {

    const { gifs, previousSearches, handleSearch, handleTermClicked } = useGifs();

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Encuentra los mejores gifs de tus personajes favoritos" />

            {/* Search */}
            <SearchBar onSearch={handleSearch} placeholder="Buscar gifs..." />

            {/* Busquedas Previas */}
            <PreviousSearches searches={previousSearches} onLabelClicked={handleTermClicked} />

            {/* Resultados */}
            <GifList gifs={gifs} />
        </>
    )
}

