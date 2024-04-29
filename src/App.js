
import { useState } from 'react';
import './App.css';

import { LC, NC, SC, UC } from './PassChar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from './components/Api-test/Test';



function App() {
  let [upperCase , setUpperCase] = useState(false);
  let [lowerCase , setLowerCase] = useState(false)
  let [specialChar , setSpecialChar] = useState(false)
  let [numbers , setNumbers ] =useState(false)
  let [passLen , setpassLen]= useState(10)
  let [fpass , setFPass] = useState('')
  let createPassword=()=>{
    let charSet = ''
    let finalPass = ''
    if(upperCase || lowerCase || specialChar || numbers){
      if(upperCase) charSet+=UC
      if(lowerCase) charSet+=LC
      if(specialChar) charSet+=SC
      if (numbers) charSet+=NC 
      if (passLen<9 || passLen>20){
        toast.warning("Please select between 10 and 20")
      }
      else{
      for (let i=0; i<passLen;i++){
        finalPass+= charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      setFPass(finalPass)
      toast.info("Password generated successfully")
    }
    }
    else{
      toast.warn("Select at least one option")
    }

  }
  let copyPass=()=>{
    navigator.clipboard.writeText(fpass)
    toast.success("Copied Success");
  }
 
  return (
    <>
    <div className="PasswordContainer">
      <h2>Password Generator</h2>
      <div className='passwordBoxIn'>
        <input type='text' readOnly value={fpass}/><button onClick={copyPass}>Copy</button>
      </div>
      <div className='passLength'>
        <label>Password Length: </label> <input type='number' max={20} min={10} value={passLen} onChange={(event)=>setpassLen(event.target.value)}/>
      </div>
      <div className='upperCase'>
        <label>Include UpperCase Letters: </label> <input type='checkbox' checked={upperCase} onChange={()=>setUpperCase(!upperCase)} />
      </div>

      <div className='lowerCase'>
        <label>Include LowerCase Letters: </label> <input type='checkbox' checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)}/>
      </div>
      <div className='Numbers'>
        <label>Include Numbers: </label> <input type='checkbox' checked={numbers} onChange={()=>setNumbers(!numbers)}/>
      </div>
      <div className='symbols'>
        <label>Include Symbols: </label> <input type='checkbox' checked={specialChar} onChange={()=>setSpecialChar(!specialChar)}/>
      </div>
      <div className='button'>
        <button className='btn' onClick={createPassword}>Generate Password</button>
      </div>
      
      
      
     
    </div>
    <ToastContainer/>
    <Test/>
    </>
  );
}

export default App;
