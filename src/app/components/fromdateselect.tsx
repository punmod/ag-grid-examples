import { Datepicker } from "flowbite-react";

export default function FromdateSelect() {
   return(<>
  
    <Datepicker id="my-datepicker"
      title="From date"
    />
     <label htmlFor="my-datepicker">Select From Date:</label>
    </>)
}