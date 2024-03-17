import { createContext, useEffect, useState } from "react";
import axios from "axios"

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

    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            
            try {
                setLoaded(true);
                const availableCurrencies = await axios("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_QcW6Nlztsxwl21QwMwMIhm8rbQLw8DoHSCtKiX5y")
                // const olaBalance = await axios.get("http://127.0.0.1:3000/balance");
                // console.log("olaBalance", olaBalance)

                const currencies = Object.keys(availableCurrencies.data.data)
                setCurrencies(currencies)
            } catch (error) {
                setError(error);
                console.log("API Error:", error)
            } finally {
                setLoaded(false);
            }
        };
        
        fetchData();
    }, []);


    
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
        setNewCurrencies,
        error,
        setError,
        loaded,
        setLoaded,
        currencies,
        setCurrencies
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;
