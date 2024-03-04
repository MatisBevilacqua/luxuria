import React, { useState } from "react";
import LoginRequest from '../../Api/Auth/Login';
import { useNavigate } from 'react-router-dom';

interface Props {
  email: string,
  password: string
}
  
const Login = (props: Props) => {

  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState<Props>({ email: '', password: '' });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try{
      const response = await LoginRequest(credentials);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    }catch (error){
      console.error(error);
    }
  };

  return(
    <div className="w-full h-[100vh] flex items-center justify-center bg-[url('./src/assets/bg-admin.jpeg')]">
      <div className="flex flex-col items-center p-[25px] gap-[30px] justify-center bg-[#FFFF] rounded-lg">
        
        <div className="w-[20vw] h-[20vh] bg-center bg-cover bg-[url('./src/assets/logo.jpeg')]"></div>
        <input 
          className= "w-[25vw] focus:outline-none h-[50px] pl-[20px] rounded-lg  bg-[#e9ecef]"
          type="email"
          name="email" 
          value={credentials.email} 
          onChange={handleInputChange} 
          placeholder="Adresse email" 
        />
        <input
          className= "w-[25vw] h-[50px] pl-[20px] focus:outline-none rounded-lg  bg-[#e9ecef]"
          type="password" 
          name="password" 
          value={credentials.password} 
          onChange={handleInputChange} 
          placeholder="Mot de passe" 
        />
        <button 
        className= "w-[25vw] h-[50px] rounded-lg  bg-[#e9ecef]"
        onClick={() => { handleSubmit() }}>Se connecter</button> 
      </div>
    </div>
  )
}

export default Login;


