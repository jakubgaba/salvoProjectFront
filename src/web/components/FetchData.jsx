import { useState, useEffect } from "react";

export default function FetchData(URLaddress){

    const [data, setData] = useState();
    const [error, setError] = useState("*** No errors ***");
    const [loading, setLoading] = useState(true);
try{
    useEffect(() => {
        const fetching = async () => {
            const response = await fetch(URLaddress);
            if(!response.ok) throw response;
            const json = await response.json();
            setData(json);
            setLoading(false);
        }
        fetching();
    }, [URLaddress]);
}
catch(error){
    setError(console.error(error));
}
finally{
    console.log("*** Trying to fetch data ***");
}
return[data,loading,error];
}