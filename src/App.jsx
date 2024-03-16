import {Container, Typography, Grid, Box, Button} from "@mui/material"
import InputeAmount from "./components/InputeAmount"
import SelectCountary from "./components/SelectCountary"
import SwitchCurrency from "./components/SwitchCurrency"
import {useContext, useEffect, useState} from "react"
import { CurrencyContext } from "./contxt/currencyContex"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import  axios  from "axios"
import CryptoPrice from "./components/CryptoPrices"

function App() {


  const { 
    fromCurrency, 
    setFromCurrency, 
    toCurrency, 
    setToCurrency,  
    firstAmount,
    setFirstAmount
  } = useContext(CurrencyContext);

  const [resultCurrncy, setResultCurrency] = useState(0)
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  const handleClick = () => {
    const handleClick = () => {
      setOpen(!open);
    };
  }

  useEffect(() => {
    if(firstAmount){
      axios("https://api.freecurrencyapi.com/v1/latest",
      {
        params: {
          apikey: "fca_live_QcW6Nlztsxwl21QwMwMIhm8rbQLw8DoHSCtKiX5y",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
      }
    }
    )
    .then(response => setResultCurrency(response.data.data[codeToCurrency]))
    .catch(error => setResultCurrency(0.00))

    }

  }, [firstAmount, fromCurrency, toCurrency])

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
        <SelectCountary value={fromCurrency} setValue={setFromCurrency} label="Fiat" />
        <SwitchCurrency />
        <SelectCountary value={toCurrency} setValue={setToCurrency} label="USDT" />
      </Grid>
        <Grid item={12} md="auto" sx={{textAlign:"right", marginTop: "2rem", fontSize:"5px"}}>
            <Button onClick={handleClick} sx={{
              borderRadius: "2",
              height: "%100"
            }}>
            View Crypto Rates
            </Button>
        </Grid>
      {firstAmount?(
        <Box sx={{textAlign: "left", marginTop: "1rem", fontSize:"5px"}}>
          <Typography> {console.log("local", parseInt(firstAmount).toLocaleString())} {parseFloat(firstAmount).toLocaleString()}  {codeFromCurrency} </Typography>
          <Grid item xs={50} >
            <CurrencyExchangeIcon sx={{fontSize: 30}}/>
          </Grid>
          <Typography variant="h5" sx={{marginTop: "5px", fontWeight:"bold"}}> {(resultCurrncy*firstAmount).toLocaleString()} {codeToCurrency}</Typography>
        </Box>
      ): ""}


    </Container>

  );
}

export default App;
