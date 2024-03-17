import {Container, Typography, Grid, Box, Button} from "@mui/material"
import InputeAmount from "./components/InputeAmount"
import SelectCountary from "./components/SelectCountary"
import SwitchCurrency from "./components/SwitchCurrency"
import SelectUSDT from "./components/USDT"
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
    setFirstAmount,
    usdtLabel,
    setUsdtLabel,
    fiatLabel,
    setFiattLabel
  } = useContext(CurrencyContext);

  const [resultCurrncy, setResultCurrency] = useState(0)
  const [balanceCurrency , setBalanceCurrency] = useState(0)
  const codeFromCurrency = fromCurrency;
  const codeToCurrency = toCurrency;





  useEffect(() => {

    console.log("fromCurrency", fromCurrency, "toCurrency", toCurrency, "firstAmount", firstAmount)
    if(firstAmount && fromCurrency !== "USDT"){
      const body = {
        currency: fromCurrency,
        fiatAmount: firstAmount
      }
      axios.post("http://127.0.0.1:3000/api/V1/test/ConvertToUsdt", body)
      .then(res => {
        const balance = parseFloat(res.data.newbalance).toLocaleString()
        const rate = parseFloat(res.data.rate).toLocaleString()
        setBalanceCurrency(balance)
        setResultCurrency(rate)
          }
      )
    // .then(response => setResultCurrency(response.data.data[codeToCurrency]))
    .catch(error => setResultCurrency(0))

    }else{
      console.log("fromCurrency", fromCurrency, "toCurrency", toCurrency, "firstAmount", firstAmount)
      const body = {
        currency: toCurrency,
        USDTAmount: firstAmount
      }
      axios.post("http://127.0.0.1:3000/api/V1/test/CovertFromUsdt", body)
      .then(res => {
        const balance = parseFloat(res.data.newbalance).toLocaleString()
        const rate = parseFloat(res.data.rate).toLocaleString()
        setBalanceCurrency(balance)
        setResultCurrency(rate)
          }
      )
    // .then(response => setResultCurrency(response.data.data[codeToCurrency]))
    .catch(error => setResultCurrency(0))

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
        <SelectUSDT value={fromCurrency} setValue={setFromCurrency} label= { usdtLabel} />
        {/* <Box sx={{textAlign: "left", marginTop:"0rem", fontSize:"5px", marginRight:"-5rem"}}>
          <Typography >switch</Typography>
        </Box> */}
        <SwitchCurrency />
        <SelectCountary value={toCurrency} setValue={setToCurrency} label={fiatLabel}/>
      </Grid>
            <Box sx={{textAlign: "right", marginTop: "2rem", fontSize:"5px", marginRight: "5rem"}}>
            <Typography>Balance</Typography>
            <Typography variant="h5" sx={{marginTop: "5px", fontWeight:"bold"}}>{"$"} {balanceCurrency} </Typography>

            </Box>
      {firstAmount?(
        <Box sx={{textAlign: "left", marginTop:"-4.5rem", fontSize:"5px"}}>
          <Typography> { parseInt(firstAmount).toLocaleString()}  {codeFromCurrency.toLocaleString()} </Typography>
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
