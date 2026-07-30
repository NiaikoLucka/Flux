import app from "./app.js";
import { ENV } from "./config/env.js";


// const PORT = process.env.PORT || 5000;


app.listen(ENV.PORT, ()=>{
    console.log(
        `API running on port ${ENV.PORT}`
    );
});