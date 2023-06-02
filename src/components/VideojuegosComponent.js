import React, { useEffect, useReducer } from 'react'
import { JuegoReducer } from '../reducers/JuegoReducer';

// es parte del reducer por eso es mejor definirla fuera
const init = () => {
    return JSON.parse(localStorage.getItem('juegos')) || [];
}

export const VideojuegosComponent = () => {
    const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

    useEffect(() => {
        // cada vez que hay un cambio en juegos se gurda en el localstorage
        localStorage.setItem('juegos', JSON.stringify(juegos));
    }, [juegos])


    const agregarVideojuego = e => {
        e.preventDefault();
        const form = e.target;

        const juego = {
            id: new Date().getTime(),
            title: form.title.value,
            description: form.description.value,
        }

        const action = {
            type: 'crear',
            payload: juego
        }

        dispatch(action);

    }

    const deleteVideojuego = (id) => {
        const action = {
            type: 'eliminar',
            payload: {id}
        }

        dispatch(action);
    }

    const updateVideojuego = (e,id) => {
        const action = {
            type: 'editar',
            payload: {id, title: e.target.value}
        }
        
        dispatch(action);
    }


  return (
    <div>
        <h1>Mis videojuegos</h1>
        <p>Numero de videojuegos: {juegos.length}</p>
        <ul>
            {
                juegos.map(j => {
                    return (
                            <li key={j.id}>
                                {j.title} &nbsp; <button onClick={e => deleteVideojuego(j.id)}>X</button>
                                <input type='text' id={'input_'+j.id} onBlur={e => updateVideojuego(e, j.id)} placeholder='Nuevo titulo'/>
                            </li>
                        )
                })
            }
        </ul>

        <br/>
        <h3>Agregar videojuego</h3>
        <form onSubmit={agregarVideojuego}>
            <input type='text' name='title' placeholder='Titulo'/><br/>
            <textarea name='description' placeholder='Descripcion'></textarea><br/>
            <button type='submit'>Agregar</button>
        </form>
    </div>
  )
}
