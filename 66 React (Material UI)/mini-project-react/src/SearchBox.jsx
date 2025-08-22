import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import './SearchBox.css'
import { useState } from "react";

export default function SearchBox() {

    let [city, setCity] = useState("");

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(city);
        setCity("");
    }

    return (
        <div className="SearchBox">
            <h3>Search for Weather</h3>
        
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="City name" variant="outlined" required value={city} onChange={handleChange} /> <br/><br/>

                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>

    );
}