import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const API_URL = "http://localhost:3000/api";

export default function Home() {
  const [val, setVal] = useState(null);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
      } else {
        try {
          await axios.get(`${API_URL}/login`, { headers: { Authorization: token } });
        } catch (error) {
        
          try {
      const refreshToken = localStorage.getItem("refreshToken")
            const refresh = await axios.post(`${API_URL}/token`, { refreshToken })
            const { accessToken } = refresh.data;
            localStorage.setItem('accessToken', accessToken)
          } catch (error) {
  console.error('Protected request failed:', error);
          router.push('/login');
          localStorage.removeItem('accessToken');
          }
        }
      }
    };

    const loadData = async () => {
      try {
        const response = await axios.get(`${API_URL}/todo`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    checkToken();
    loadData();
  }, []);



  useEffect(() => {

    const fetch = async () => {
      
    }
    fetch()
  }, [])




  const handleInputChange = (e: any) => {
    setVal(e.target.value);
  };

  const addTodo = async () => {
    try {
      const newData = { name: val };
      await axios.post(`${API_URL}/todo`, newData);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Enter Name" onChange={handleInputChange} />
      <button onClick={addTodo}>Add Todo</button>
      <div>{data?.map((item: any) => <h1 key={item.id}>{item?.name}</h1>)}</div>
    </div>
  );
}
