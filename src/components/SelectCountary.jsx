import { useCountries } from "../hooks/Apis"; 
import {Grid, Autocomplete, TextField, Skeleton} from "@mui/material"

const SelectCountry = (props) => {
    const {value, setValue, label} = props;
    const [countriesData, error, loaded, currencies] = useCountries("https://restcountries.com/v3.1/all");

    if(loaded){
        return(
            <Grid item xs={12} md={3}>
                <Skeleton variant="rounded" height={60}></Skeleton>
            </Grid>
        )
    }

    if(error){
        return "Something Went Wrong!"
    }
    
    

    const filteredData = countriesData.filter(countary => "currencies" in countary);
    let newC = []
    console.log("filteredData", filteredData)
    console.log("currencies", currencies);
    const dataCountary = filteredData.map(countary => {
        newC.push(Object.keys(countary.currencies)[0])
        return `${countary.flag} ${Object.keys(countary.currencies)[0]} ${countary.name.common}`
    })

    console.log(newC)

    

    return (
        <Grid item xs={12} md={3}>
            <Autocomplete
                value={value}
                disableClearable
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                options={dataCountary}
                renderInput={(params) => <TextField {...params} label={label}/>}
            />
        </Grid>
    );
};

export default SelectCountry;