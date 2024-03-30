'use client'
import SelectCollege from "@/app/components/collegeselect";
import GridExample from "@/app/components/table";
import GridExample2 from "@/app/components/table2";
import GridExample3 from "@/app/components/table3";

import TodateSelect from "@/app/components/todateselect";
import GridExampleUpdate from "@/app/components/updatecell";
import { useEffect, useState } from "react";

export default function TeachingFaculty() {

            const [firstrecords,setFirstrecords]=useState([]);
          
            const[status,setStatus]=useState({Collegeselected:false,todate:false, fromdate:false,  collegename:"",role:"",selectedDate:""});
                    
            const [collegenames, setCollegeNames] = useState([]);

            const [recordsAfterCollege, setRecordsAfterCollege] = useState([]);
            
          
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };


            function handlecollegechange(rec:any){
              setStatus({...status,Collegeselected:true,
                                   collegename:rec.target.value});
            }

             const handleDateChange = (date:any) => {
                setStatus({...status,todate:true,selectedDate:date});
                  const formattedDate = date.toLocaleDateString('en-US', options); 
                  console.log(formattedDate); // Output like: 11/25/2024
                  console.log(date.getTime()) 
              };

                useEffect(()=>{
                         fetch(`https://dhe.misrusachd.in/nextjsapi/teaching-faculty/select.php`)
                                .then((response:any)=>response.json())
                                .then((data:any)=>{                                       
                                 if(data[0]==="institution")               
                                   setStatus({...status,role:data[0],Collegeselected:true,collegename:data[1].name})
                                       
                                 else
                                {    //retrieve college names
                                  setCollegeNames(data.filter( (thing: { name: any; }, i: any, arr: any[]) => 
                                   arr.findIndex(t => t.name === thing.name) === i && typeof thing.name === 'string')
                                      )
                                  setStatus({...status,role:data[0]})
                                  setFirstrecords(data);
                                    }
                            
                                  }
                          )
                      .catch(error => {
                                          console.log(error); // or console.error(error)
                                      });
            },[])         

                 useEffect(()=>{
                       const filteredRecords=recordsAfterCollege.filter((item:any)=>
                                                                         {return item.name=status.collegename 
                                                                        })                      
                       setRecordsAfterCollege(filteredRecords)
                       },[status.collegename])
                       
                 useEffect(()=>{
                                                                
                       },[status.selectedDate])                                 



  return (<>


          <div className="container card"> 
            <div className="flex flex-wrap justify-center"> 
              <div className="w-full md:w-1/4 "></div>
              <div className="w-full md:w-1/2 text-center"><SelectCollege uniquecollegenames={collegenames} onchange={handlecollegechange}></SelectCollege></div>
              <div className="w-full md:w-1/4"></div>
            </div>

          {status.Collegeselected &&  <div className="flex flex-wrap justify-center mt-4"> 
                  <div className="w-full md:w-1/4 "></div>
              <div className="w-full md:w-1/2 text-center">
              <TodateSelect onchange={handleDateChange}></TodateSelect>
              </div>
              <div className="w-full md:w-1/4"></div>
            </div>}
           
         

            <div className="flex flex-wrap justify-center mt-4"> 
            
              <div className="w-full  text-center" >
              <GridExampleUpdate></GridExampleUpdate></div>
            </div>
          </div>

         
            
         

</>
  )
}