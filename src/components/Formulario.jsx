import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore"

const Formulario = () => {
    const [cantidad,setCantidad] = useState("");
    const [valueMaterial, setValueMaterial] = useState("");
    const [valueDije, setValueDije] = useState("");
    const [valueTipo, setValueTipo] = useState("");
    const [valueTipoMoneda, setValueTipoMoneda] = useState("");
    
    const guardarManilla = async(e) =>{
        e.preventDefault();
        try {
            const data = await addDoc(collection(db,'manillas'),{
                valueMaterial:valueMaterial,
                valueDije:valueDije,
                valueTipo,valueTipo,
                valueTipoMoneda:valueTipoMoneda,
                cantidad:cantidad
            })
        } catch (error) {
            console.log(error)
        }
    } 
    
    return (
    <div className="container mt-5">
        <h1 className="text-center">CRUD DE MANILLAS</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h4 className="text-center">Listado</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="lead">text</span>
                        <button className="btn btn-danger btn-sm float-end mx-2">Eliminar</button>
                        <button className="btn btn-warning btn-sm float-end">Editar</button>
                    </li>
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">Agregar Manillas</h4>
                <form>
                    <div className="row">
                    <label>Elija el material:
                        <select name="material" className="form-control">
                            <option id="1">Cuero</option>
                            <option id="2">Cuerda</option>
                        </select>
                    </label>
                    </div>
                    <div className="row">
                    <label>Elija el dije:
                        <select name="material" className="form-control">
                            <option id="1">Martillo</option>
                            <option id="2">Ancla</option>
                        </select>
                    </label>
                    </div>
                    <div className="row">
                    <label>Elija el tipo:
                        <select name="material" className="form-control">
                            <option id="1">Oro</option>
                            <option id="3">Oro rosado</option>
                            <option id="4">Plata</option>
                            <option id="5">Niquel</option>
                        </select>
                    </label>
                    </div>      
                    <span>Cantidad</span>
                    <input type="number"  className="form-control mb-2" placeholder="Ingrese cantidad"/>
                    <div className="row">
                    <label>Elija el tipo de monda:
                        <select name="material" className="form-control">
                            <option id="1">Dolar</option>
                            <option id="3">Peso colombiano</option>
                        </select>
                    </label>
                    </div> 
                    <button className="btn btn-primary btn-block">Agregar</button>
                </form>
            </div>
        </div>
        
    </div>
  )
}



export default Formulario