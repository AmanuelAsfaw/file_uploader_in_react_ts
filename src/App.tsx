import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUploaderTable from './components/FileUploaderTable';
import FileUploader from './components/FileUploader';
import axios from 'axios';
import { FileInterface } from './services/fileInterface';

function App() {
  const [data, setData] = useState<Array<FileInterface>>([])
  useEffect(()=>{
    axios.get('http://localhost:3000/api/files')      
    .then((res) => res.data)     
    .then((data) => {
      if(data.success){
        setData(data.data)
      }
    }) 
    .catch((err) => console.error(err));
  },[])
  const changeData = (newFile: FileInterface) => {

    let array = new Array<FileInterface>();
    array.push(newFile)
    
    setData(array.concat(data))
  }

  const removeFile = (id: number) => {
    setData(data.filter((item)=> item.id !== id))
  }

  return (
    <div className="App"> 
      <FileUploader changeData={changeData}/>    
      <FileUploaderTable data={data} removeLocalFile={removeFile}/> 
    </div>
  );
}

export default App;
