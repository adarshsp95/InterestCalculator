import { TextField, Button, Stack } from "@mui/material";
import "./App.css";
import { useState } from "react";

function App() {
  const [interest, setInterest] = useState(0);
  const [principle, setPrinciple] = useState(0);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(0);

  const [validPrinciple, setValidPrinciple] = useState(true);
  const [validRate, setValidRate] = useState(true);
  const [validYear, setValidYear] = useState(true);

  const validateUserInput = (e) => {
    const { name, value } = e.target;

    //to view in browser:
    // console.log(`${name}, ${typeof value}`);
    // console.log(!!value.match(/^[0-9]*.?[0-9]+$/));

    if (!!value.match(/^[0-9]*\.?[0-9]+$/)) {
      // Valid pattern
      if (name === "principle") {
        setPrinciple(value);
        setValidPrinciple(true);
      } else if (name === "rate") {
        setRate(value);
        setValidRate(true);
      } else {
        setYear(value);
        setValidYear(true);
      }
    } else {
      // Invalid pattern
      if (name === "principle") {
        setPrinciple(value);
        setValidPrinciple(false);
      } else if (name === "rate") {
        setRate(value);
        setValidRate(false);
      } else {
        setYear(value);
        setValidYear(false);
      }
    }
  };

  const handleReset=()=>{
    setPrinciple(0)
    setRate(0)
    setYear(0)
    setInterest(0)
    setValidPrinciple(true)
    setValidRate(true)
    setValidYear(true)
  }


  const handleCalculate=(e)=>{
    e.preventDefault()
    if(!principle  || !rate || !year){
      alert("Plase fill form completely")
    }
    else{
      setInterest(principle*rate*year/100)
    }
  }

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <div style={{ width: "600px" }} className="bg-light p-5 rounded">
        <h1 style={{ height: "60px" }}>Simple Interest Calculator</h1>
        <p>Calculate your interest easily</p>
        <div
          style={{ width: "100%", height: "130px" }}
          className="d-flex justify-content-center align-items-center bg-warning mt-5 text-light shadow rounded flex-column"
        >
          <h1 style={{ height: "50px" }}>₹ {interest}</h1>
          <p className="fw-border">Total Simple Interest</p>
        </div>

        <form className="mt-4"
         onSubmit={handleCalculate}>
          <div className="mb-2">
            <TextField
              className="w-100"
              id="outlined-basic-principle"
              label="₹ Principle Amount"
              variant="outlined"
              name="principle"
              value={principle || ""}
              onChange={(e)=>validateUserInput(e)}
              // onChange={(e)=>setPrinciple(e.target.value)}  before this we need to do validation for input
            />
          </div>

          { !validPrinciple&&<div className="mb-3 text-danger fw-bolder">Invalid Principle Amount</div>}


          <div className="mb-2">
            <TextField
              className="w-100"
              id="outlined-basic-rate"
              label="Rate of Interest (%)"
              variant="outlined"
              name="rate"
              value={rate || ""}
              onChange={e=>validateUserInput(e)}
            />
          </div>
          { !validRate&&<div className="mb-3 text-danger fw-bolder">Invalid Rate</div>}





          <div className="mb-2">
            <TextField
              className="w-100"
              id="outlined-basic-time"
              label="Time Period (Yr) "
              variant="outlined"
              name="year"
              value={year || ""}
              onChange={e=>validateUserInput(e)}
            />
          </div>
          { !validYear&&<div className="mb-3 text-danger fw-bolder">Invalid Year</div>}




          <Stack direction={"row"} spacing={2}>
            <Button
              type="submit"
              style={{ height: "70px", width: "50%" }}
              className="bg-dark"
              variant="contained"
              disabled={validPrinciple&&validRate&&validYear?false:true}
            >
              Calculate
            </Button>
            <Button
            onClick={handleReset}
              style={{ height: "70px", width: "50%" }}
              className="text-dark"
              variant="outlined"
            >
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
