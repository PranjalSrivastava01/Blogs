
import { useEffect, useState } from 'react'
import './App.css'
import { login, logout } from './store/authSlice';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { Footer, Header } from './components';
function App() {
//conditional redering
const [loading,setLoading]=useState(true);
const dispatch=useDispatch();
useEffect(()=>{
authService.getCurrentUser()
.then((userData)=>{
  if(userData)
  {
    dispatch(login({userData}))
  }
  else
  {
    dispatch(logout())
  }
})
.finally(()=>setLoading(false))
},[])
return !loading?(
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
     <Header></Header>
     <main>
     </main>
     <Footer></Footer>
    </div>
  </div>
):null
}

export default App
