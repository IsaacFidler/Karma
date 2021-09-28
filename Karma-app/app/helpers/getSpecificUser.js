import {useState, useEffect} from 'react';
import {urlUser} from '../components/utils'
import axios from 'axios';


const findUser = async (username) => {
  const [user, setUser] = useState({})

  try
  {
    const res = await axios.get(urlUser + username)
    let ans = []

    let data = Object.values(res.data)
    for (let i of data)
    {
      ans.push(i)
    }
    setUser(ans)


  } catch (error)
  {
    console.log(error)
  }

  return user

}

export default findUser