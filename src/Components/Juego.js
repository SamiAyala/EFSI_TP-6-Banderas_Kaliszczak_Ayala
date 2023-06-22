import './Juego.css' 

function Juego(props){
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.respuesta.value);
        props.setRespuesta(e.target.respuesta.value);
    }
    return(
        <div>
            <img className='Img' src={props.flag} alt="" ></img>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Ingrese su respuesta:</label>
            <input type="text" name="respuesta" />
            <input type="submit" value="Submit" />
        </form>
            <button onClick={props.cambiarPais}>Skip</button>
        </div>
    )
}

export default Juego;