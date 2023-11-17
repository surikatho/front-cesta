import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
export function Producto() {
    const params = useParams()
    const {data, isLoading} = useQuery("producto", () => {
        return fetch(`http://localhost:5555/products/${params.id}`).then(res => res.json())
    })
    if (isLoading) {
        return <div>Cargando....</div>
    }

    return <p>{JSON.stringify(data)}</p>
}
import {Link} from 'react-router-dom'
export function Productos() {
    const {data, isLoading} = useQuery("producto", () => {
        return fetch("http://localhost:5555/products").then(res => res.json())
    })
    if (isLoading) {
        return <div>Cargando....</div>
    }

    return <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {data.map(producto =>(
                    
                    <tr key={producto.ProductID}>
                        <td><Link to={`/Productos/${producto.ProductID}`}>{producto.ProductName}</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}