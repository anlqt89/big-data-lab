import { Analysis } from "../components/Analysis"
import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";

export const Colaborations =() =>{
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.COLABORATIONS}`);

    return(
       
        <div className="container text-center">
            <div className="row align-items-start">
                <div className="col">
                    <h1>Colaborations</h1>
                    <h4>Comming Soon!</h4>
                </div>
                <div className="col">
                    <Analysis></Analysis>
                </div>
            </div>
        </div>  )
}