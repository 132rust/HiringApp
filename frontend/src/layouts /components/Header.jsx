import { useState } from "react"


export default function Header() {
    
    const[now, setNow] = useState(new Date())
    
    setInterval(()=> setNow(new Date()),1000)

    return(
        <>
        <div className="header">
            <div className="heaedr_logo">
               <div> <h1>RRResault</h1></div>
                <span><h1>Время сейчас: {now.toLocaleTimeString()}</h1></span>
            </div>
        </div>
        
     
        </>
    
    )

};