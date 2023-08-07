import "./Formulario.css";

import { useState } from "react";

 function Formulario({ setUser }) {

    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name === '' || pass === ''){
            setError(true)
            return
        }
        
        setError(false)
        
        setUser([name])
    }

    return(
        <section>
            <h1>Login</h1>

            <form 
                className="formulario"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />
                <button>Iniciar Sesión</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    )
}

export default Formulario;