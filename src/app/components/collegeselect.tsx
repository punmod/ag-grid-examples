

export default function SelectCollege(props:any)
{
   
return(
   <form className="max-w-md mx-auto">
  <label htmlFor="underline_select" className="sr-only">Underline select</label>
  <select id="underline_select" onChange={props.onchange} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                 
                <option value="Statement" selected >Choose College</option>
                               {props.uniquecollegenames.map((item:any) => {
                      return (<option key={item.name} value={item.name}>{item.name}</option>);
  })}
  </select>
</form>



)
}