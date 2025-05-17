import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function Login() {
  const [cod, setCod] = useState("");
  const [pass, setPass] = useState("");
  const navi = useNavigate()
  const logearse = async (e) => {
    e.preventDefault();
    try {
      fetch(apiUrl + "/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cod,
          password: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            navi("/panel")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={logearse}
        className="w-3/4 bg-blue-600 p-4 flex flex-col gap-4"
      >
        <div className="flex flex-col w-full items-center">
          <label htmlFor="" className="text-2xl text-white">
            codigo
          </label>
          <input
            onChange={(e) => {
              setCod(e.target.value);
            }}
            type="number"
            className="w-3/4 h-12 bg-white pl-2 pr-2"
          />
        </div>
        <div className="flex flex-col w-full items-center">
          <label htmlFor="" className="text-2xl text-white">
            Contraseña
          </label>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            className="w-3/4 h-12 bg-white pl-2 pr-2"
          />
        </div>
        <div className="flex flex-col w-full items-center">
          <button className="border-1 border-white h-12 w-1/2 text-2xl text-white">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
