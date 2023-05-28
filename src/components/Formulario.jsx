import React, {useState, useEffect} from "react"
import { db } from "../firebase"
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore"

const Formulario = () => {
    const [cantidad,setCantidad] = useState("");
    const [valorUnitario,setValorUnitario] = useState("");
    const [valueMaterial, setValueMaterial] = useState("");
    const [valueDije, setValueDije] = useState("");
    const [valueTipo, setValueTipo] = useState("");
    const [valueTipoMoneda, setValueTipoMoneda] = useState("");
    const [listaManillas, setListaManillas] = useState([]);
    const [result, setResult] = React.useState();
    const [id,setId] = useState(0);
    const [modoEdicion, setModoEdicion] = useState(false);
    const cbMaterial = [{value: "seleccionar", name: "Seleccionar"},{value: "cuero", name: "Cuero"},{value: "cuerda", name: "Cuerda"}];
    const cbDije = [{value: "seleccionar", name: "Seleccionar"},{value: "martillo", name: "Martillo"},{value: "ancla", name: "Ancla"}];
    const cbTipo = [{value: "seleccionar", name: "Seleccionar"},{value: "oro", name: "Oro"},{value: "oro rosado", name: "Oro rosado"},{value: "niquel", name: "Niquel"},{value: "plata", name: "Plata"}];
    const cbTipoMoneda= [{value: "seleccionar", name: "Seleccionar"},{value: "dolar", name: "Dolar"},{value: "peso", name: "Peso colombiano"}];
    
    useEffect(()=>{
        const obtenerLista = async() =>{
            try {
                await onSnapshot(collection(db,'manillas'),(query)=>{
                    setListaManillas(query.docs.map((doc)=>{
                        return {...doc.data(), id:doc.id}}))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerLista();
    },[])


    const guardarManilla = async(e) =>{
        e.preventDefault();
        try {
            const data = await addDoc(collection(db,'manillas'),{
                valueMaterial:valueMaterial,
                valueDije:valueDije,
                valueTipo:valueTipo,
                valueTipoMoneda:valueTipoMoneda,
                cantidad:cantidad,
                valorUnitario: valorUnitario,
                result:result
            })
            setListaManillas([...listaManillas,{
                valueMaterial:valueMaterial,
                valueDije:valueDije,
                valueTipo:valueTipo,
                valueTipoMoneda:valueTipoMoneda,
                cantidad:cantidad,
                valorUnitario:valorUnitario,
                result:result,
                id: data.id
            }])
            setCantidad('')
            setValueMaterial('')
            setValueDije('')
            setValueTipo('')
            setValueTipoMoneda('')
            setValorUnitario('')
            setResult('')
        } catch (error) {
            console.log(error)
        }
    }
    
    const cancelar = () =>{
        setModoEdicion(false)
        setCantidad('')
        setValueMaterial('')
        setValueDije('')
        setValueTipo('')
        setValueTipoMoneda('')
        setValorUnitario('')
        setResult('')
        setId('')
    }

    const eliminarLista = async id => {
        try {
            await deleteDoc(doc(db,'manillas',id))
        } catch (error) {
            console.log(error)
        }
    }

    const editarLista = item =>{
        setCantidad(item.cantidad)
        setValueMaterial(item.valueMaterial)
        setValueDije(item.valueDije)
        setValueTipo(item.valueTipo)
        setValueTipoMoneda(item.valueTipoMoneda)
        setValorUnitario(item.valorUnitario)
        setResult(item.result)
        editable(item);
    }

    const editable = item => {
        setCantidad(item.cantidad)
        setValueMaterial(item.valueMaterial)
        setValueDije(item.valueDije)
        setValueTipo(item.valueTipo)
        setValueTipoMoneda(item.valueTipoMoneda)
        setValorUnitario(item.valorUnitario)
        setResult(item.result)
        setId(item.id)
        setModoEdicion(true)
    }

     const editarManillas = async(e) =>{
        e.preventDefault();
        try {
            const docRef = doc(db,'manillas',id);
            await updateDoc(docRef,{
                valueMaterial:valueMaterial,
                valueDije:valueDije,
                valueTipo:valueTipo,
                valueTipoMoneda:valueTipoMoneda,
                cantidad:cantidad,
                valorUnitario: valorUnitario,
                result:result
            })
            const nuevoArray = listaManillas.map(
                item => item.id === id ? {
                    id:id,
                    valueMaterial:valueMaterial,
                    valueDije:valueDije,
                    valueTipo:valueTipo,
                    valueTipoMoneda:valueTipoMoneda,
                    cantidad:cantidad,
                    valorUnitario: valorUnitario,
                    result:result
                }:item
            )
            setListaManillas(nuevoArray);
            setCantidad('')
            setValueMaterial('')
            setValueDije('')
            setValueTipo('')
            setValueTipoMoneda('')
            setValorUnitario('')
            setResult('')
            setId('')
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
    }

    const MonedaProducto = function () {
        if(valueTipoMoneda != 'Seleccionar'){
            if(valueTipoMoneda == 'Dolar'){
                setResult(cantidad * valorUnitario);
            }else{
                setResult((cantidad * valorUnitario)/5000);
            }
        }        
      };
    
    return (
    <div className="container mt-5">
        <h1 className="text-center">Manillas El Benju</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                <h4 className="text-center">Listado</h4>
                <ul className="list-group">
                    {         
                    listaManillas.map(item=>(
                        <li key={item.id} className="list-group-item">
                            <span className="lead">Material: {item.valueMaterial}</span><br/>
                            <span className="lead">Dije: {item.valueDije}</span><br/>
                            <span className="lead">Tipo: {item.valueTipo}</span><br/>
                            <span className="lead">Tipo Moneda: {item.valueTipoMoneda}</span><br/>
                            <span className="lead">Cantidad: {item.cantidad}</span><br/>
                            <span className="lead">Valor Unitario: {item.valorUnitario}</span><br/>
                            <span className="lead">Total: {item.result}</span>
                            <button className="btn btn-danger btn-sm float-end mx-2" onClick={()=>eliminarLista(item.id)}>Eliminar</button>
                            <button className="btn btn-warning btn-sm float-end" onClick={()=>editarLista(item)}>Editar</button>
                        </li>
                    ))         
                    }
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">{modoEdicion ? 'Editar Manillas' : 'Agregar Manillas'}</h4>
                <form onSubmit={modoEdicion ? editarManillas : guardarManilla}>
                    <div className="row">
                    <label>Elija el material:
                        <select name="material" onChange={(e)=>setValueMaterial(e.target.value)} value={valueMaterial} className="form-control">
                            {cbMaterial.map(cb1 => <option key={cb1.value} id={cb1.value}>{cb1.name}</option>)}
                        </select>
                    </label>
                    </div>
                    <div className="row">
                    <label>Elija el dije:
                        <select name="dije" onChange={(e)=>setValueDije(e.target.value)} value={valueDije} className="form-control">
                        {cbDije.map(cb2 => <option key={cb2.value} id={cb2.value}>{cb2.name}</option>)}
                        </select>
                    </label>
                    </div>
                    <div className="row">
                    <label>Elija el tipo:
                        <select name="tipo" onChange={(e)=>setValueTipo(e.target.value)} value={valueTipo} className="form-control">
                        {cbTipo.map(cb3 => <option key={cb3.value} id={cb3.value}>{cb3.name}</option>)}
                        </select>
                    </label>
                    </div>      
                    <span>Cantidad</span>
                    <input type="number" onChange={(e)=>setCantidad(e.target.value)} value={cantidad} className="form-control mb-2" placeholder="Ingrese cantidad"/>
                    <div className="row">
                    <label>Elija el tipo de moneda:
                        <select name="tipo_moneda" onChange={(e)=>setValueTipoMoneda(e.target.value)} value={valueTipoMoneda} className="form-control">
                        {cbTipoMoneda.map(cb3 => <option key={cb3.value} id={cb3.value}>{cb3.name}</option>)}
                        </select>
                    </label>
                    </div> 
                    <span>Valor Unitario (en dólares)</span>
                    <input type="number" onKeyUp={MonedaProducto} onChange={(e)=>setValorUnitario(e.target.value)} value={valorUnitario} className="form-control mb-2" placeholder="Ingrese valor unitario"/>
                    
                    <div className="row">
                    <span>Total</span>
                    <input type="number" disabled value={result} className="form-control mb-2"/>
                    </div>                    
                    {
                    modoEdicion ? (
                        <><button className='btn btn-warning btn-block'>Editar</button>
                        <button onClick={()=>cancelar()} className='btn btn-dark btn-block mx-2'>Cancelar</button></>
                    ):(<><button className='btn btn-primary btn-block'>Agregar</button></>)
                    }
                </form>
            </div>
        </div>
        
    </div>
  )
}



export default Formulario