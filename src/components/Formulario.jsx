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
            </div>
        </div>
    </div>
  )
}



export default Formulario