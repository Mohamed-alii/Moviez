import { useState , useCallback } from "react";

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const sendRequest = useCallback( async ( requestConfig ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : {},
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );

            if(!response.ok){
                throw new Error('request to server failed!');
            }

            const data = await response.json();

            setData(data);

        } catch (error) {
            setError(error.message || 'Something went wrong!')
        }
        setIsLoading(false);
    }, [] ) ;

    return {
        isLoading,
        error,
        data,
        sendRequest
    }
}

export default useHttp;