import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";
import type { Gif } from "../interfaces/gif.interface";


const gifsCache: Record<string, Gif[]> = {};

const useGifs = () => {

    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousSearches, setPreviousSearches] = useState<string[]>([]);

    //Este hook guarda en memoria los gifs que ya se han buscado, para no hacer peticiones innecesarias a la API. Es un cache simple, pero efectivo.
    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {

        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    }

    const handleSearch = async (term: string = '') => {
        term = term.trim().toLocaleLowerCase();
        if (term.length === 0) return

        if (!previousSearches.includes(term)) {
            const currentTerms = previousSearches.slice(0, 7)
            setPreviousSearches([term, ...currentTerms]);

            const gifs = await getGifsByQuery(term);
            setGifs(gifs);
            gifsCache.current[term] = gifs;
        }
    }


    return { gifs, previousSearches, handleSearch, handleTermClicked }

}

export default useGifs