
import { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'
const baseURL = "https://jsonplaceholder.typicode.com/posts/1";
function GetAxios() {
    const [my_data, setData] = useState([]);
    useEffect(() => {
        Axios.get(baseURL)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            });
    }, []);

    return (
        <div>
            <h1>{my_data.id}</h1>
            <p>{my_data.title}</p>
            <p>{my_data.body}</p>
        </div>
    )
}

export default GetAxios
