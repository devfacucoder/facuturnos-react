import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import {useNavigate} from "react-router-dom"
function Login() {
  const navi = useNavigate()
  const [logSend, setLogSend] = useState({
    cod: "",
    password: "",
  });
  const [errLog, setErrLog] = useState(false);
  const logearse = (e) => {
    e.preventDefault();
    fetch(apiUrl + "/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(logSend),
    })
      .then((res) => {
        if (res.status == 504) {
          setErrLog(true);
          console.log("mal")
        } else {
          setErrLog(false);
          navi("/secretario")
        }
        return res.json();
      })
      .then((data) => {
        if(data.token){
          localStorage.setItem("token",data.token
            
          )
        }
        cosnole.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full flex justify-center pt-5 px-2">
      <form
        className="flex flex-col w-96 bg-blue-600 gap-4 p-4"
        onSubmit={logearse}
      >
        <div className="flex flex-col items-center">
          <label
            htmlFor="inpCod"
            className="w-5/6 text-start text-sm text-white"
          >
            Codigo
          </label>
          <input
            type="text"
            className="bg-white w-5/6 h-10 text-base px-2 "
            id="inpCod"
            placeholder="Ingrese su codigo"
            required
            onChange={(e) => {
              setLogSend((prev) => ({ ...prev, cod: e.target.value }));
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="inpPass"
            className="w-5/6 text-start text-sm text-white"
          >
            Contraseña
          </label>
          <input
            type="text"
            required
            className="bg-white w-5/6 h-10 text-base px-2"
            placeholder="Ingrese su contraseña"
            id="inpPass"
            onChange={(e) => {
              setLogSend((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        {errLog ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-sm text-red-300">
              codigo o contraseña incorrecto{" "}
            </p>
          </div>
        ) : null}

        <div className="w-full flex flex-col items-center">
          <button
            type="submit"
            className="bg-white w-2/5 text-lg rounded-md font-medium cursor-pointer active:bg-blue-300 active:text-white  "
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
