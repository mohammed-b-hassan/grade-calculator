import React,{ useState, useEffect } from 'react';
import { Container, ButtonGroup, Button, Jumbotron, Alert, InputGroup, FormControl, ListGroup, Row,Form, } from 'react-bootstrap';
import  './App.css';
// custom components 

import InputField from './components/InputField';


const  App = () => {

  const [data,setData] = useState([{hour: '', grade: '', prevGrade:'', removed: false}]);
  const [result,setResult] = useState('');
  const [prevAvrage,setPrevAvrage] = useState(0);
  const [prevHours,setPrevHours] = useState(0);
  const [addState,setAddState] = useState(true);

  
  const calculateHandler = (e) => {
    e.preventDefault();
    let currentGrades = 0;
    let currentHours = 0;
    let totalHours = 0;
    let totalGrades = 0;
    let totalPrevGrades = 0;
    let prevGrade  = 0;

    data.map((v,i) => {
      
      if(v.removed) return ;
      
      currentGrades += parseInt(v.grade) * parseInt(v.hour);
      currentHours += parseInt(v.hour);
      prevGrade = v.prevGrade;
  
      if(parseInt(prevGrade).isFinite) totalPrevGrades += currentGrades;
    });
    
    totalHours = (parseInt(currentHours)+parseInt(prevHours));
    totalGrades = (currentGrades+parseInt(prevAvrage)*parseInt(prevHours)) - totalPrevGrades;

    setResult(Math.round(((totalGrades/totalHours)*100)/100));
  }
  

  const resetHandler = () => {
    setData([{hour: '', grade: '', prevGrade:'', removed: false}]);
    setResult('');
    setPrevAvrage(0);
    setPrevHours(0);
    setAddState(true);

  }
    
  const addInputHandler = () => {
    if (data.length > 7) return setAddState(false);
    setData([...data, {hour: '', grade: '', prevGrade:'', removed: false}])
  
}






  const inputs =  data.map(
      (v,i) => {

      
      return(
      <Row className="justify-content-md-center" key={i} >
        <ListGroup.Item>
            <InputField
            
            id={i}
            data={data}
            setData={setData}


          />
       </ListGroup.Item>

      </Row>  
        
    );
        
        
        
      }   
      
    );

// console.log(data);

  return (
<>          
          <Jumbotron style={{textAlign:'center'}}> 
            <h1> حساب المعدل التراكمي المتوقع </h1> 
            <br/>
            <h3> برنامج حساب المعدل التراكمي المتوقع للطلبة </h3>
          </Jumbotron>
    
          <Container >

            <InputGroup className="mb-3" size="sm">
              <InputGroup.Append>
                <InputGroup.Text> الساعات المقطوعة  </InputGroup.Text>
            
              </InputGroup.Append>
              
                <FormControl type="number" max="400" min="0" value={prevHours} name="hour"   placeholder="prevHours" onChange={ (e) => setPrevHours(e.target.value) } />
                
                <InputGroup.Append>
                  <InputGroup.Text> المعدل الحالي </InputGroup.Text>
              
                </InputGroup.Append>
                
                
                <FormControl type="number"  max="100" min="0" step="0.01"  value={prevAvrage}  name="grade"  placeholder="prevAvrage" onChange={ (e) => setPrevAvrage(e.target.value) } />
            </InputGroup>
            
            
            
            {
              result &&
            
            <Alert variant="primary" style={{textAlign: 'center'}}>
              <Alert.Heading>    حسب المعلومات المدخله من قبلك فإن المعدل التراكمي المتوقع سيكون </Alert.Heading>
              <strong className="mb-0"> {result}% </strong> 
              <div className="d-flex justify-content-end">
                <Button onClick={resetHandler} variant="outline-primary">
                  Reset
                </Button>
              </div>
            </Alert>
            
              }


            <Form onSubmit={calculateHandler}>
      

              <ListGroup variant="flush">

              
                { inputs }
              </ListGroup>
              
    
            
            
            
        
            <div className="center ">
            <ButtonGroup>
              <Button type="submit"  variant="primary" size="sm" active>
              حساب
              </Button>
                {addState && 
                <Button onClick={addInputHandler} variant="secondary" size="sm" active>
                  اضافة مادة
                </Button>
                }
              </ButtonGroup>
           </div>
           </Form>
           
        </Container>
</>
        );
}

export default App;
