import { createContext, useState } from "react"
import run from "../config/gemini";


export const Context = createContext();
const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recent, setRecent] = useState("");
    const [prevPrompt, setPrevPrompt] = useState({});
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redata, setRedata] = useState("");

    const deletePara = (index,newxtWord)=>{

setTimeout(function () {
    setRedata(prev=>prev+newxtWord)
}, 75*index)
    }
//  hum is function ko isliye bna rhe hai kyuki jab hum new chat me click kare to jo repose mila hao vo claer ho jay of front page dikhe
    const newChat = () =>{
        setLoading(false)
        setResult(false)
    }

    const onSent = async (prompt) => {
        setRedata("")
        setLoading(true)
        setResult(true)
        let response;
        if(prompt !== undefined){
         response = await run(prompt);
         setRecent(prompt);
        }
     else{
        setPrevPrompt(prev => Array.isArray(prev) ? [...prev, input] : [input]);
        setRecent(input)
        response = await run(input);
     }
  
        //  yaha hum recent entry ki field ko update karige. hum check karige aaagr hamare pass aagara parameter me koi bhi data aata hai to we will generate the repose using this parameter aagar koi data nahi hai to prompt to hum respose ko geenrate karige using input field
      
        // create a varrivate to slipt star from the respose paragraph
        let responseArray = response.split("**");
        // to solve the proble of empty undefind mtlb jab bhi hum search krte hai to jo repoonse para rhta hai uske first me undefind aata hai islye hum new array ko empty string kr dige
        let newArray="";
        for(let i=0;i< responseArray.length; i++){
if(i===0 || i%2 !==1){
    newArray += responseArray[i]
}else{
    newArray += "<b>"+ responseArray[i]+ "</b>"
}
        }
        // this will generate response by typing effect
        let newArray2 = newArray.split("*").join("</br>")
        let newResponseArray = newArray2.split(" ");
        for(let i=0; i<newResponseArray.length;i++){
            const newxtWord = newResponseArray[i];
            deletePara(i,newxtWord+" ")
        }
        setLoading(false)
        setInput("")
        console.log( input);
      

    }


    const contextvalue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecent,
        recent,
        result,
        loading,
        redata,
        setInput,
        input,
        newChat
    }
    return (
        <Context.Provider value={contextvalue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;
