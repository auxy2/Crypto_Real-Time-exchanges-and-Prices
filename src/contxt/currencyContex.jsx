import { createContext, useState } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD United States");
    const [toCurrency, setToCurrency] = useState("🇨🇦 CAD Canada");
    const [firstAmount, setFirstAmount] = useState(0);
    const [usdtLabel, setUsdtLabel] = useState("USDT")
    const [fiatLabel, setFiattLabel] = useState("Fiat")
    const [inputUsdtLabel, setInputUsdtLabel] = useState("USDT Amount")
    const [inputFiatLabel, setInputFitLabel] = useState("Fiat Amount")
    
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
        setInputFitLabel
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;
