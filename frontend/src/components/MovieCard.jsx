import './moviecard.css'
export const MovieCard = ({index, tconst, title, type, genres, year}) =>{
   
    return(
        <tr className="my-tr">
            <td className="my-td" scope="row"> {index}</td>
            <td className="my-td" >{title}</td>
            <td className="my-td" >{type}</td>
            <td className="my-td" >{genres}</td>
            <td className="my-td" >{year}</td>
        </tr>
    )
}