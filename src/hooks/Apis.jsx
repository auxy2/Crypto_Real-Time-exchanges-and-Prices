import { useEffect, useState } from "react";
import axios from "axios";

export const useCountries = (url) => { 
    const [countriesData, setCountriesData] = useState([]);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoaded(true);
                const response = await axios(url);
                const availableCurrencies = await axios("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_QcW6Nlztsxwl21QwMwMIhm8rbQLw8DoHSCtKiX5y")
                const currencies = Object.keys(availableCurrencies.data.data)
                setCountriesData(response.data);
                setCurrencies(currencies)
            } catch (error) {
                setError(error);
                console.log("API Error:", error)
            } finally {
                setLoaded(false);
            }
        };
        
        fetchData(); // Call the fetchData function to initiate the API call
    }, [url]);

    return [countriesData, error, loaded, currencies];
};

export default useCountries