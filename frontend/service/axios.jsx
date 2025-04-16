import axios from "axios"

const axioshandler = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    }
});





const getRequest = async (url, data) => {

    try {
        const reponse = await axioshandler.get(url);
        return reponse.data;

    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        throw error


    }
}

const  postRequest = async (URL, data) =>{

     try {

        const  response  =  await  axioshandler.post(URL, data);
        return response.data;
        
     } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
        throw error 
     }
}

export { getRequest, postRequest }