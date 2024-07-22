import React, { useContext, useState } from 'react'
import './Sliderbar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Slidebar = () => {
  //create a functionality for sidebar side baar me hum click kre to vo extend ho i will use thi state to hide and display p tag
  const [extend, setExtend] = useState(false)
  const { onSent, prevPrompt, setRecent ,newChat} = useContext(Context)
// this is use to save the entry when we refresh and connect to the recent--entry class div
  const loadPrompt = async(prompt) =>{
    setRecent(prompt)
    await onSent(prompt)
  }

  return (
    <div className='sidebar'>
      {/* this function help us get previous value and return not previous value and privious value to not previous value if previous is true it will return false if it false it will return true */}
      <div onClick={() => {
        setExtend(prev => !prev)
      }} className="top">
        <img className='menu' src={assets.menu_icon} alt="" />
        <div onClick={()=>{
          newChat()
        }} className="newchat">
          <img src={assets.plus_icon} alt="" />
          {/* if state is true than show p tage if state is flase the show null */}
          {extend ? <p >New Chat</p> : null}
        </div>
        {extend ? <div className="recent">
          <p className="recent-title">Recent</p>
          {Array.isArray(prevPrompt) && prevPrompt.map((item, index) => {
            return (
              <div key={index} onClick={()=>loadPrompt(item)} className="recent-entery">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,18)} ...</p>
              </div>
            )
          })}

        </div> : null}

      </div>
      <div className="bottom ">
        <div className="bottomitem  recent-entery">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Helps</p> : null}
        </div>

        <div className="bottomitem  recent-entery">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Acitvity</p> : null}
        </div>

        <div className="bottomitem  recent-entery">
          <img src={assets.send_icon} alt="" />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>

    </div>
  )
}

export default Slidebar
