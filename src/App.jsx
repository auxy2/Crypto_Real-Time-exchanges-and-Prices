// import {Container, Typography, Grid, Box, Button} from "@mui/material"
// import InputeAmount from "./components/InputeAmount"
// import SelectCountary from "./components/SelectCountary"
// import SwitchCurrency from "./components/SwitchCurrency"
// import SelectUSDT from "./components/USDT"
// import {useContext, useEffect, useState} from "react"
// import { CurrencyContext } from "./contxt/currencyContex"
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
// import  axios  from "axios"

// function App() {

//   const { 
//     fromCurrency, 
//     setFromCurrency, 
//     toCurrency, 
//     setToCurrency,  
//     firstAmount,
//     setFirstAmount,
//     usdtLabel,
//     setUsdtLabel,
//     fiatLabel,
//     setFiattLabel,
//     formerBalance,
//     setFormerBalance
//   } = useContext(CurrencyContext);

//   const [resultCurrncy, setResultCurrency] = useState(0)
//   const [balanceCurrency , setBalanceCurrency] = useState(0)
//   const codeFromCurrency = fromCurrency;
//   const codeToCurrency = toCurrency;

  
//     useEffect(() => {
//       const debounceTimeout = setTimeout(() => {
//         if (firstAmount && fromCurrency !== "USDT") {
//           const body = {
//             currency: fromCurrency,
//             fiatAmount: firstAmount
//           };
//           axios.post("https://cyan-frantic-deer.cyclic.app/api/V1/test/ConvertToUsdt", body)
//             .then(res => {
//               const balance = parseFloat(res.data.newbalance).toLocaleString();
//               const rate = parseFloat(res.data.rate).toLocaleString();
//               console.log("balance", balance, res.data)
//               setBalanceCurrency(balance);
//               setResultCurrency(rate);
//             })
//             .catch(error => setResultCurrency(0));
//         } else if (firstAmount && toCurrency !== "USDT") {
//           const body = {
//             currency: toCurrency,
//             USDTAmount: firstAmount
//           };
//           axios.post("https://cyan-frantic-deer.cyclic.app/api/V1/test/CovertFromUsdt", body)
//           .then(res => {
//             const balance = parseFloat(res.data.newbalance).toLocaleString();
//             const rate = parseFloat(res.data.rate).toLocaleString();
//             console.log("balance", balance, res.data)
//             setBalanceCurrency(balance);
//             setResultCurrency(rate);
//           })
//             .catch(error => setResultCurrency(0));
//         }
//       },300); 

//       const fetchData = async() => {
//         const oldBalance = await axios.get("https://cyan-frantic-deer.cyclic.app/api/V1/test/balance");
//                 const balance = parseFloat(oldBalance.data.balance).toLocaleString()
//                 setBalanceCurrency(parseFloat(balance))
//       }
//       fetchData()
  
//       // Cleanup function to clear the timeout if component unmounts or firstAmount changes
//       return () => clearTimeout(debounceTimeout);
//     }, [firstAmount, fromCurrency, toCurrency]);

//   const StyleBox = {
//     background: "#fdfdfd",
//     marginTop: "10rem",
//     textAlign: "center",
//     color: "#222",
//     minHeight: "20rem",
//     borderRadius: 5,
//     padding: "4rem 2rem",
//     boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
//     position: "relative"
//   };
  

//   return (
//     <Container maxWidth="md" sx={StyleBox}>
//       <Typography variant="h5" sx={{ marginBottom: "2rem" }}> Buy And Sell USDT </Typography>
//       <Grid container spacing={2}>
//         <InputeAmount />
//         <SelectUSDT value={fromCurrency} setValue={setFromCurrency} label= { usdtLabel} />
//         <SwitchCurrency />
//         <SelectCountary value={toCurrency} setValue={setToCurrency} label={fiatLabel}/>
//       </Grid>
//             <Box sx={{textAlign: "right", marginTop: "2rem", fontSize:"5px", marginRight: "5rem"}}>
//             <Typography>Balance</Typography>
//             <Typography variant="h5" sx={{marginTop: "5px", fontWeight:"bold"}}>{"$"} {balanceCurrency} </Typography>

//             </Box>
//       {firstAmount?(
//         <Box sx={{textAlign: "left", marginTop:"-4.5rem", fontSize:"5px"}}>
//           <Typography> { parseInt(firstAmount).toLocaleString()}  {codeFromCurrency.toLocaleString()} </Typography>
//           <Grid item xs={50} >
//             <CurrencyExchangeIcon sx={{fontSize: 30}}/>
//           </Grid>
//           <Typography variant="h5" sx={{marginTop: "5px", fontWeight:"bold"}}> {(resultCurrncy).toLocaleString()} {codeToCurrency}</Typography>
//         </Box>
//       ): ""}


//     </Container>

//   );
// }

// export default App;




import { MoonPayProvider, MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useState } from "react"

export default function App() {
  const [visible, setVisible] = useState(false);

    return (
        <MoonPayProvider 
            apiKey="pk_test_aQHBiuABMhcg6xCIcgS4ew9ZsOMgo6ri" 
            environment="sandbox" 
            debug
        >
           <MoonPayBuyWidget
            variant="overlay"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            defaultCurrencyCode="eth"
            visible
        />

{/* <MoonPayBuyWidget
            variant="embedded"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            defaultCurrencyCode="eth"
            visible
        /> */}
        <button onClick={() => setVisible(visible)}>
            Toggle widget
        </button>
        </MoonPayProvider>
        
    )
}
