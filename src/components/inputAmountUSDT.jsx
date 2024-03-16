import {Grid, TextField, InputAdornment } from "@mui/material"
import { CurrencyContext } from "../contxt/currencyContex"
import { useContext } from "react"


const InputeAmount = () => {
    const {firstAmount, setFirstAmount} = useContext(CurrencyContext)
    return (
        <Grid item xs={12} md>
            <TextField 
            value={firstAmount}
            onChange={e => setFirstAmount(e.target.value)}
            label="USDT Amount"
            fullWidth
            InputProps={{
                type: "number",
                startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
            >   
            </TextField>
        </Grid>
        )
}

export default InputeAmount