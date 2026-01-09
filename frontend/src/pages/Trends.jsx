import { Analysis } from "../components/Analysis"
import { SetFavicon } from "../components/SetFavicon"
import { FAVICON_TITLES } from "../global/constants"

export const Trends = ()=>{
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.TRENDS}`);
    return(<>
        <div className="container text-center">
            <div className="row align-items-start">
                <div className="col">
                    <h1>Trends</h1>
                    <h4>Comming soon</h4>
                    <div>
                        Plans
                    </div>
                </div>
                <div className="col">
                    <Analysis></Analysis>
                </div>
            </div>
        </div> 
    </>)
}