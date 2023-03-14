import { useState, useEffect } from "react";

export default function FetchData(URLaddress) {

    const [data, setData] = useState();
    const [error, setError] = useState("*** No errors ***");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await fetch(URLaddress);
                if (!response.ok) {
                    const error = new Error(response.status);
                    error.status = response.status;
                    throw error;
                }
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (error) {
                const errorStatus = error.status || "Unknown error";
                setError(`Error status: ${errorStatus}`);
                if(error.status == 403){
                alert("You have to be logged in !");
                window.location.href = '/';
                }
            }
        };
        fetching();
    }, [URLaddress]);

    return [data, loading, error];
}