import React from 'react';
import {Link} from 'react-router-dom';

function Inicio() {
    return (
        <div>
            <ul>
                <li> 
                    <Link to="/login">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ingresar
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/ListaMedicos">
                        Pedir Turno
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Inicio;
