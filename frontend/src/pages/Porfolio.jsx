import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";

export const Portfolio = ()=>{
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.PORTFOLIO}`);
    return (<>
        <h1>Portfolio</h1>
    </>)
}