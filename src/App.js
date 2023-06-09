
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Juego from './Components/Juego';
import Ayuda from './Components/Ayuda';


function App() {
  const [respuesta, setRespuesta] = useState('');
  const [arrayPaises, setarrayPaises] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [pais, setPais] = useState({});
  const [timer, setTimer] = useState(15);
  const [referencia, setReferencia] = useState();
  const [stringLetras,setstringLetras] = useState('');
  const [arrayAyuda,setarrayAyuda] = useState([]);
  const [arrayLetrasUsadas, setarrayLetrasUsadas] = useState([]);


  useEffect(()=>{
    if(timer === 0 || timer < 0){
      cambiarPais();
    }
  },[timer])
  
  useEffect(() => {
    axios.get('http://localhost:3000/data.json')
    .then((response) => {
        setReferencia(setInterval(()=> {setTimer( t => t - 1)},1000));
        const array = response.data.data;
        let id = Math.floor(Math.random() * (array.length + 1));
        setPais(array[id]);
        
        setstringLetras(array[id].name)
        setarrayPaises(array);
        let arrayAux = new Array(array[id].name.length);
        for (let i = 0; i < array[id].name.length; i++) {
          if (array[id].name[i] === ' ') {
            arrayAux[i] = ' '
          }
          else{
            arrayAux[i] = ' _ '  
          }
          
        }
        setarrayAyuda(arrayAux);
      });
  }, []);
  useEffect(()=>{
    if (respuesta === pais.name) {
      setPuntos(puntos + 10 + timer);
      cambiarPais();

    } else {
      if (puntos > 0) setPuntos(puntos - 1);
    }
  },[respuesta]);


  let cambiarPais = () => {
    clearInterval(referencia);
    setTimer(15);
    setReferencia(setInterval(()=> {setTimer( t => t - 1)},1000));
  let id = Math.floor(Math.random() * (arrayPaises.length + 1));
  setPais(arrayPaises[id]);
  setstringLetras(arrayPaises[id].name);
  let arrayAux = new Array(arrayPaises[id].name.length);
        for (let i = 0; i < arrayPaises[id].name.length; i++) {
          arrayAux[i]=' _ ';
        };
  setarrayAyuda(arrayAux);
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Puntos: {puntos}</h1>
        {<h2>Tiempo: {timer} </h2>}
        <h2>Pista : {arrayAyuda.map(char => <span className={ char  === " " ? 'espacio' : 'letra' }>{char}</span>)}</h2>
        <h2>Cantidad de letras : {arrayAyuda.length}</h2>
        <Ayuda timer = {timer} setTimer = {setTimer} setarrayLetrasUsadas = {setarrayLetrasUsadas} arrayLetrasUsadas = {arrayLetrasUsadas} arrayAyuda = {arrayAyuda} setarrayAyuda = {setarrayAyuda} stringLetras = {stringLetras}></Ayuda>
        <Juego setRespuesta={setRespuesta} flag={pais.flag} cambiarPais={cambiarPais}></Juego>
      </header>
    </div>
  );
}

export default App;
