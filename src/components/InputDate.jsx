import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
function InputDate({ setDate }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="relative w-full max-w-xs">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          const formatted = format(date, "yyyy-MM-dd");
          setDate(formatted);
        }}
        locale={es}
        className="w-full py-2 px-3 rounded-md bg-white text-black placeholder-gray-500"
        calendarClassName="bg-white text-black"
        dateFormat="dd/MM/yyyy"
      />
      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
    </div>
  );
}

export default InputDate;
