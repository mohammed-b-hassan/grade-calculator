import React,{useState} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';


const InputField = (props) =>{
  
  
  const [addInputField,setaddInputField] = useState(false)
  
  const {data, id, setData} = props;
  
  const changeHandler = (e) => {

    const { name, value } = e.target;
    let newData = [ ...data ];
    newData[id] = { ...newData[id] ,[name]: value};
    setData( newData );

      
    }
  const deleteHandler = () => {

    let newData = [...data]
    if (newData.length == 1) return;
      newData.splice(id, 1);
  
      setData(newData);
      
  }
  const toggleChange = (e) =>{ 
    const { name } = e.target;
    const value = !data[id].[name];
    let newData = [ ...data ];
    newData[id] = { ...newData[id] ,[name]: value};
    setData( newData );

      
  
  } 
  
const   addFieldHandler = () =>{



    setaddInputField(!addInputField);
    if(!addInputField) {
    
    
      let newData = [ ...data ];
      newData[id] = { ...newData[id] ,prevGrade: ''};
      
      
      setData( newData );  
    }
    
  }
  
  
  return (


  
    <InputGroup className="mb-3" size="sm">

  
  <FormControl required  type="number" max="14" min="1"  value={data[id]?.hour} name="hour"    placeholder="عدد الساعات" onChange={ changeHandler } />
    <FormControl required type="number" max="100" min="35"  step="0.01" value={data[id]?.grade}  name="grade"  placeholder="العلامة المتوقعة" onChange={ changeHandler } />
    {addInputField &&   <FormControl required type="number" max="100" min="35"  step="0.01" value={data[id]?.prevGrade}  name="prevGrade"  placeholder="العلامة السابقة" onChange={ changeHandler } />  }

  <InputGroup.Append>
    <Button onClick={deleteHandler} variant="outline-primary" size="sm" >
      حذف
    </Button>
    </InputGroup.Append>

      </InputGroup>
      


    
  );
  
  
  
}

export default InputField;