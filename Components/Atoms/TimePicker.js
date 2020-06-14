import React, { useState, Fragment } from "react";
import DatePicker from "react-native-date-picker";

const TimePicker = () => {
  const [date, setDate] = useState(new Date());
  // return <Fragment></Fragment>;
  return <DatePicker date={date} onDateChange={setDate} />;
};

export default TimePicker;
