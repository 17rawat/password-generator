import { useCallback, useState, useRef } from "react";

import { toast } from "react-hot-toast";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);
  // console.log(passwordRef);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isSpecialCharAllowed) str += "!@#$%&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      // console.log(char);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isSpecialCharAllowed, setPassword]);

  const copyPasswordToClipboard = () => {
    console.log(passwordRef.current);
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
    toast.success("Copied", {
      duration: 1000,
    });
  };

  // console.log(Password);
  // useEffect(() => {
  //   passwordGenerator();
  // }, [length, isNumberAllowed, isSpecialCharAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3 text-2xl mb-4">
        Password-Generator
      </h1>
      <div className="flex shadow  overflow-hidden mb-4">
        <input
          className="outline-none w-full rounded py-1 px-3 mr-2"
          type="text"
          placeholder="Password"
          readOnly
          value={Password}
          ref={passwordRef}
        />

        <button
          className="outline-none bg-blue-700  rounded text-white px-3 py-1 mr-2 shrink-0"
          onClick={passwordGenerator}
        >
          Generate
        </button>

        <button
          className="outline-none bg-blue-700 rounded text-white px-3 py-1 shrink-0"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex text-m gap-x-8">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={15}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isNumberAllowed}
            onChange={() => {
              setIsNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>

        <div className="flex  items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isSpecialCharAllowed}
            onChange={() => {
              setIsSpecialCharAllowed((prev) => !prev);
            }}
          />
          <label>Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
