// src/Components/useFetch.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IFetch, Iphoto } from '../interfaces/fetch.interface';

const useFetch = ({ url, method }: IFetch) => {
  const [res, setRes] = useState<Iphoto[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
        setLoading(true)
        const response = await axios.get(url, {
        headers: {
          'Authorization': `Client-ID ${process.env.REACT_APP_API_KEY}`,
        },
      });
      setRes(response.data);
      setLoading(false) 
    } catch (err) {
      setError('Error fetching data'); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [url, method]);

  return { res, error, loading };
};

export default useFetch;
