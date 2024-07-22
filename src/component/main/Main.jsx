import React, { useContext} from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {
    // here ww will get the state and function using the context api
const {onSent , recent,result,loading,redata,setInput,input} = useContext(Context)
//  in this componenet we have state and function and we will use this state and funtion to display our result on screen

  return (
    
    <div className="main">

        <div className="nav">
            <p>Gimini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {/* show result/result false hua to card dikhige otherwaise card hide ho jaige of result dikhige */}
            
           {!result 
           ?<>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
           </>
           :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                {/* p tag me hum result dikhaige jo hum search kr rhe hai */}
                <p>{recent}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon} alt="" />
                {/* if loading is true we display loader if loading is false we display paragraph with reuslt data */}
                {loading?<div className='loader'>
                    <hr/>
                    <hr/>
                    <hr/>
                </div>:<p dangerouslySetInnerHTML= {{__html: redata}}></p>}
             
            </div>
           </div>  }
            <div className="mainbottom">
                <div className="searchbox">
                    {/* e means hum event pass kr rhe hai, e.target.vlaue use krte hai display karane ke liye apna result ko sreen me */}
                    <input onChange={(e)=>setInput(e.target.value)} type="text" value={input} placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                      {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}  
                    </div>
                </div>
                <p className='bottominfo' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla.</p>
            </div>
        </div>
    </div>
   

  )
}

export default Main
