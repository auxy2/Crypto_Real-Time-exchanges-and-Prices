import {Container, Typography, Grid, Box} from "@mui/material"
import InputeAmount from "./components/InputeAmount"
import SelectCountary from "./components/SelectCountary"
import SwitchCurrency from "./components/SwitchCurrency"
import { useContext, useEffect, useState} from "react"
// import {CurrencyContext} from "./contxt/currencyContex"
import { CurrencyContext } from "./contxt/currencyContex"

import axios from "axios"


function App() {


  const { 
    fromCurrency, 
    setFromCurrency, 
    toCurrency, 
    setToCurrency,    
    firstAmount,
    setFirstAmount 
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1]
  const codeToCurrency = toCurrency.split(" ")[1]
  console.log(firstAmount, resultCurrency);

  useEffect(() => {
    if(firstAmount){
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apiKey: "FU3euSfJ9SreMvXu3Dvm4RIwigCIuyMJGW6Nhj3h",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
      .then(response => setResultCurency(response.data.data[codeToCurrency]))
    }

  }, [firstAmount, 
    fromCurrency, 
    toCurrency, 
    codeFromCurrency, 
    codeToCurrency])

  const StyleBox = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 5,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
    position: "relative"
  };


  return (
    <Container maxWidth="md" sx={StyleBox}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>Stay Ahead with Accurate Conversions</Typography>
      <Grid container spacing={2}>
        <InputeAmount />
        <SelectCountary value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountary value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>
      (firstAmount? (
        <Box sx={{textAlign: "left", marginTop: "1rem"}}>
          <Typography>
            {firstAmount} {fromCurrency} =
          </Typography>
          <Typography variant="h5" sx={{marginTop: "5px", fontWeight: "bold"}}>
            {resultCurrency*firstAmount} {toCurrency}
            </Typography>
        </Box>
      ))
    </Container>

  );
}

export default App;
