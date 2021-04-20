import axios from 'axios';
import {useEffect, useState} from 'react';
import './App.css';
import User from './components/users';
import Pagination from './components/Pagination';
import { USER_PER_PAGE } from './utils/constants';

function App() {
  const [users, setUsers] = useState([]);
  const[loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  console.log(totalPages);

  useEffect(() => {
    const fetchUsers = async () =>{
      setLoading(true);
      const res = await axios.get('https://randomuser.me/api/?page=1&results=50&nat=us');
      setLoading(false);
      setUsers(res.data.results);

      setTotalPages(Math.ceil(res.data.results.length/USER_PER_PAGE));
    }
    fetchUsers();
  }, [])

  const handleClick= (num)=>{
    setPage(num);
  }
  return (
    <div className="App">
      <h2>Load Data</h2>
      <p>Page: {page}</p>
      { loading ? <p>Loading...</p> : 
      <User users={users} page={page}/> }
      <Pagination totalPages={totalPages} handleClick={handleClick}/>
    </div>
  );
}

export default App;
