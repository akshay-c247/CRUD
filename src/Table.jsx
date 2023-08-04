import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';

function Table() {
    const [mydata,setData]=useState([]);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[uname,usetName]=useState("");
    const[uemail,usetEmail]=useState("");
    const[editId,setEditID]=useState(-1)


    useEffect(()=>{
     axios.get('https://64ccb5bd2eafdcdc851a299b.mockapi.io/user')
     .then(res =>
        {console.log(res.data)
        setData(res.data)} )
     .catch(err => console.log(err));
    },[])
    const handleSubmit =(event)=>{
        event.preventDefault();
        const id=mydata[mydata.length-1].id +1;
        axios.post('https://64ccb5bd2eafdcdc851a299b.mockapi.io/user',{id: id,name:name,email:email})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        
    }
    const handleEdit =(id) =>{
        axios.put(`https://64ccb5bd2eafdcdc851a299b.mockapi.io/user/${id}`)
     .then(res => {
        console.log(res.data)
        usetName(res.data.name)
        usetEmail(res.data.email)
     } )
     .catch(err => console.log(err));
        setEditID(id)

    }


    const handleUpdate = (pUser) =>{
        axios.put(`https://64ccb5bd2eafdcdc851a299b.mockapi.io/user/${editId}`,{id:editId,name:uname,email:uemail})
        .then(res =>{
            console.log(res);
          
            setEditID(-1);
        }).catch(err => console.log(err));

    //   const temp=pUser

     console.log(mydata , "md");
      mydata.splice(Number(pUser.id),1,uname)
        console.log(mydata,"vgjj")
    }


    const handleDelete = (id) =>{
        axios.delete(`https://64ccb5bd2eafdcdc851a299b.mockapi.io/user/${id}`)
        .then(res =>{
            console.log(res);
         
            
        }).catch(err => console.log(err));

    }
  return (
    <div className='container'>
    <div>
        <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter name' onChange={e =>setName(e.target.value)} />
                <input type="text" placeholder='Emter Email' onChange={e =>setEmail(e.target.value)}/>
                <button>Add</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    
                    <th>email</th>
                    <th>createdAt</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody style={{}}>
                {
                    mydata.map((user,index) =>(
                        user.id===editId ?
                        <tr>
                            <td>{user.id}</td>
                            <td><input type="text" value={uname} onChange={e =>usetName(e.target.value)}/></td>
                            <td><input type="text" value={uemail}onChange={e =>usetEmail(e.target.value)}/></td>
                            <td><button onClick={() =>handleUpdate(user)}>update</button></td>
                        </tr>
                        :
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td>
                                <button onClick={() =>handleEdit(user.id)}>edit</button>
                                <button onClick={()=>handleDelete(user.id)}>delete</button>
                            </td>
                        </tr>
                    )

                    )
                    
                }
            </tbody>

        </table>



    </div>
    </div>
  )
}

export default Table;