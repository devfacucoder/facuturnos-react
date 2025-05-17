import React, { useState, useEffect } from "react";
import { FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
function ListaTurnos() {
  const [dataMedicos,setDataMedicos] = useState([])
 

  useEffect(() => {
    fetch(apiUrl + "/api/medico/listamedicos/")
      .then((res) => res.json())
      .then((data) => {
        setDataMedicos(data.listamedicos)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full overflow-x-hidden px-2 py-2 bg-white shadow-lg">
      <ul className="flex flex-col gap-3">
        {dataMedicos.map((e, idx) => (
          <li
            key={idx}
            className="min-h-20 bg-blue-100 hover:bg-blue-200 transition rounded-lg flex items-center shadow-sm"
          >
            <Link to={`/pedirturno/${e._id}`}  className="flex items-center px-4 gap-3">
              <FaUserMd className="text-blue-500 text-2xl" />
              <span className="font-semibold text-blue-800 text-lg">
                {e.nombre}
              </span>
              <span>- Dentista</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTurnos;
