import { Alert, Button, Upload, UploadFile, UploadProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import axios from "axios";
import { FileInterface } from "../services/fileInterface";


const FileUploaderTable = (props: { changeData: any; }) => {    
    const {changeData} = props
    const [fileData, setFileData] = useState<File | null>(null);
    const [fileList, setFileList] = useState<Array<FileInterface>>([]);
    const [alertMessage, setAlertMessage] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMode, setAlertMode] = useState('error')
    const onFileChange = (file : File) => {
        console.log(file);
        setFileData(file)
    }

    const fileSubmit = () => {
        console.log(fileData);
        
        if(fileData !== null){
            let formData = new FormData();
            formData.append('file',fileData)
            console.log(formData);            
            axios.post('http://localhost:3000/api/files', formData,{
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => res.data)
            .then((data) => {
                if(data.success){
                    
                    const newFile = {
                        id : data.data?.id,
                        name : data.data?.name,
                        size : data.data?.size,
                        createdAt : data.data?.createdAt,
                        updatedAt: data.data?.updatedAt
                    }
                    
                    changeData(newFile)
                    setAlertMessage(data.message);
                    setAlertMode('success');
                    setShowAlert(true);
                }
                else{
                    setAlertMessage(data.message);
                    setShowAlert(true);
                    setAlertMode('error');
                }
                
                
            })
            .catch((err) => console.error(err));
        } 
    }

    return <div>
        {showAlert && alertMessage && (<Alert showIcon style={{margin: '10px'}} message={alertMessage} type={alertMode == 'success'?'success':'error'} closable onClose={()=> {setShowAlert(false)}}></Alert>)}
        <div style={{display: "flex", justifyContent: "center", marginTop: '50px', marginBottom: '50px'}}>
            <div style={{marginRight: '100px'}}>                
                <input type="file" name="file" onChange={(event)=> {
                    if(event.target.files?.length){
                        setFileData(event.target.files[0]);
                        console.log(event.target.files[0]);
                        console.log(fileData);
                        
                    }
                    else{
                        console.log(event.target.files);
                    }
                }} style={{fontSize: '18px'}}/>
            </div>
            <Button onClick={() => {fileSubmit()}} style={{backgroundColor: "darkgray", fontWeight: "bold"}}>Add</Button>
        </div>
    </div>
}

export default FileUploaderTable;