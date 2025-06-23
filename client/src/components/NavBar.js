import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  useEffect(() => {
    let localData = localStorage.getItem("receptData");
    if (!localData) return navigate("/");
    localData = JSON.parse(localData);
    setName(localData.data.name);
  }, [navigate]);
  return (
    <>
      <SideBar name={name} />
    </>
  )
}

export default NavBar
