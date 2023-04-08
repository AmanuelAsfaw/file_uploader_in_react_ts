import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {RestOutlined} from '@ant-design/icons';
import { FileInterface } from "../services/fileInterface";
import axios from "axios";

const FileUploaderTable = (props : {data: any, removeLocalFile: any}) => {
    const data_ = props.data;
    const removeLocalFile = props.removeLocalFile;

    const changeDatetimeFormat = (datetime: string) => {
        const split_t = datetime.split('T')
        return split_t[0]+ '  '+ split_t[1].split('Z')[0]
    }

    const removeFile = async(id: number) => {
        await axios.delete('http://localhost:3000/api/files/'+id)
            .then((res)=> res.data)
            .then((data) => {
                console.log(data);
                
                if(data.success){
                    console.log(data.success);
                    
                    removeLocalFile(id)
                }
            })
    }

    const columns: ColumnsType<FileInterface> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{text}</b>
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (text) => <b>{
                (text/1024).toFixed(3).toString() + ' KB'
                }</b>
        },
        {
            title: 'Created Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => <b>{
                changeDatetimeFormat(text) 
                }</b>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                  <Button icon={<RestOutlined/>} onClick={() => {removeFile(record.id)}}></Button>
                </Space>
              ),
        }
        
    ] 
    
    return <div style={{margin: '50px'}}>
        <Table dataSource={data_} columns={columns}></Table>
    </div>
}

export default FileUploaderTable;