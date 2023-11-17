import { useContext, useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Context } from "../main";
import { Link } from "react-router-dom";
export function Cesta() {
    const [estado, setEstado] = useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [txOk,setTxOk] = useState(null)
    const [txKo,setTxKo] = useState(null)
    const total = estado.cesta.reduce((acc, item) => acc + item.total,0)

    useEffect(()=>{
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then (cuentas => {
            setCuenta(cuentas[0])
            ethereum.on("accountsChanged", (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    },[])
    async function pagar() {
        const txParams = {
            to:"0xF3CCc14cE3cC1e0E79Ea05E13Ad41b13a9E17578",
            from: cuenta,
            value: ethers.toBeHex(ethers.parseEther(total.toString()))
        }
        try {
            const tx = await ethereum.request({
                method:"eth_sendTransaction",
                params:[ txParams]
            })
            setTxOk(tx)
        } catch (error) {
            setTxKo(error)    
        }

        console.log(txParams)
    }
    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {estado.cesta.map(i => (
                    <tr key={i.producto.ProductID}>
                        <td>
                            <Link to={`/productos/${i.producto.ProductID}`}>
                                {i.producto.ProductID}
                            </Link>
                            </td>
                        <td>{i.producto.ProductName}</td>
                        <td>{i.producto.UnitPrice}</td>
                        <td>{i.cantidad}</td>
                        
                        <td>{i.total}</td>
                        
                    
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total {total} </h3>
        <h4>{cuenta}</h4>
        <button onClick={()=>pagar()} className="btn btn-primary">Pagar</button>

        {txOk && <p className="alert alert-sucess">{txOk}</p>}
        {txKo && <p>{txKo}</p>}
    </div>
}