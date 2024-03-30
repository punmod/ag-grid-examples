"use client";
import { Datepicker } from "flowbite-react";
import {  useState } from "react";
export default function TodateSelect(props:any) {
   
   

    return(<>
    <div className="flex items-center gap-2">
    <label htmlFor="my-datepicker"> Date:</label>
   <Datepicker id="my-datepicker"  onSelectedDateChanged={props.onchange}  />
   
    </div>
    
   
    </>)
}