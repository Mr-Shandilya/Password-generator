import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
//useCallback is just for memoisation or efficiency or optimisation
//length,numberAllowed,charAllowed and password is changing so we used useState hook
//useEffect har bar password banne wala function call karega yadi kuchh bhi change hoga
//kyuki hum sirf password use kr rahe h return krte samay na ki funcn call kr rahe h

//copy bas window.navigator.clipboard.writeText(password) karne se ho jaayega
//other feature like select and range of copy ke liye useRef hook
//.content se
//return krte samay ref={passwordRef} bhi karna text me
//jaha last time ref={passwordRef} likha hoga wahi ka reference store hoga

//range me value={length} likhna tabhi onChange={(e) => {setLength(e.target.value)}} work karega
//e->event
//jab bhi value change hoga (slide karne se) tab tab length update karna h

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passwordGenerator = useCallback(() => {//To make a new passw and update it
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789" //only if numberAllowed
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`" //only if charAllowed

    for (let i = 1; i <= length; i++) {  //dimag random string each time
      let char = Math.floor(Math.random() * str.length )  //returns random index
      pass += str.charAt(char)
      
    }
    setPassword(pass) //updated password


  }, [length, numberAllowed, charAllowed, setPassword])
  
  //useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) //if anything changes,function is called


  //useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();  //to highlight text while copying
    passwordRef.current?.setSelectionRange(0, 999); //to set range of text to be copied
    window.navigator.clipboard.writeText(password)  //Main thing
  }, [password])

 
  
  
  return (
    
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-sky-300 text-cyan-800">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-orange-500"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )

}

export default App