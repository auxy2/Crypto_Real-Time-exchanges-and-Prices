import { createContext, useState } from "react";
import useCountries from "../hooks/Apis";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {


    const [fromCurrency, setFromCurrency] = useState("USDT");
    const [toCurrency, setToCurrency] = useState("CAD");
    const [firstAmount, setFirstAmount] = useState(0);
    const [usdtLabel, setUsdtLabel] = useState("USDT")
    const [fiatLabel, setFiattLabel] = useState("Fiat")
    const [inputUsdtLabel, setInputUsdtLabel] = useState("USDT Amount")
    const [inputFiatLabel, setInputFitLabel] = useState("Fiat Amount")
    const [usdtCurr, setUsdtCurr] = useState(["USDT"])
    const [newCurrencies, setNewCurrencies] = useState([])


    // console.log("currencies", newCurrencies)


    
    const value = {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
        setFirstAmount,
        usdtLabel,
        setUsdtLabel,
        fiatLabel,
        setFiattLabel,
        inputUsdtLabel,
        setInputUsdtLabel,
        inputFiatLabel,
        setInputFitLabel,
        usdtCurr,
        setUsdtCurr,
        newCurrencies,
        setNewCurrencies
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;
