import styled from "styled-components";
import DatePicker from "react-native-date-picker";
import moment from "moment";

export default function Calendar() {
  console.log("Calendar");
  return (

    <DatePicker
    modal
    mode="date"
    open={open}
    date={date}
    onConfirm={(date) => {
      setOpen(false);
      setDate(date);
      const formattedDate = moment(date).format("YYYY-MM-DD");
      setDateText(formattedDate);
    }}
    onCancel={() => {
      setOpen(false);
    }}
  />

  );
}
