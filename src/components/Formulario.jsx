import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore"

const Formulario = () => {
    const [cantidad,setCantidad] = useState("");
    const [valueMaterial, setValueMaterial] = useState("");
    const [valueDije, setValueDije] = useState("");
    const [valueTipo, setValueTipo] = useState("");
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
                    <input type="text" className="form-control mb-2" placeholder="Ingrese cantidad"/>
                </form>
            </div>
        </div>
        
    </div>
  )
}



export default Formulario