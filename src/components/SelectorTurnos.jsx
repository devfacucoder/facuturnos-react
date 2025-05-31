import React from "react";
const horarios = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];
function SelectorTurnos({setStateHora}) {
  return (
    <ul className="  flex flex-wrap  items-center justify-center gap-2 p-4 ">
      {horarios.map((e, index) => (
        <li className="w-18 h-10 bg-white text-blue-900  flex items-center justify-center text-2xl"
        onClick={()=>{
            setStateHora(e)
        }}
        >
          {e}
        </li>
      ))}
    </ul>
  );
}

export default SelectorTurnos;
