const url = 'https://10.10.22.243:3005/jobs/user';
import {useState, useEffect} from 'react';
import axios from 'axios';


const findUser = async (username) => {
  const [user, setUser] = useState({})

  try
  {
    const res = await axios.get(url + username)
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