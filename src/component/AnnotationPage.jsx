import React,{useState,useEffect} from 'react'


const AnnotationPage = () => {

  const [selectedOption, setSelectedOption ] =  useState('');
  const [textAreaValue,setTextAreaValue] =  useState("");
  const [otherOptionValue, setOtherOptionValue] = useState('');
  const [radioButtonOptions,setRadioButtonOptions] =  useState([]);
  const [otherButtonOptions,setOtherButtonOptions] =  useState([]);
  const [isShowTextField,setIsShowTextField] =  useState(false);
  
  function funcFormObject(ele,index){
    return { 
      id:index,
      type:'checkbox',
      value:ele,
      text:ele
    }
  }

  useEffect(() => {
    fetch('/api/v1/fetchTag').then(res => res.json()).then(data => {
      const allData =  data.fields;

      allData.forEach((element) => {

          if(element['report_type']){
           const categoricalData =  element['report_type']['categorical'] ? element['report_type']['categorical']: element['report_type']['categorical']
           const formattedData =  categoricalData.map((ele,index)=>funcFormObject(ele,index)) 
           setRadioButtonOptions(formattedData);
          }
          else if(element['whether']){
           const categoricalData = element['whether']['categorical'] ?  element['whether']['categorical']: element['whether']['categorical'];
           const formattedData =  categoricalData.map((ele,index)=>funcFormObject(ele,index)); 
           setOtherButtonOptions(formattedData);
          }else if(element['configuration']){
            const isCommentsEnabled =  element['configuration']['comment'];
            setIsShowTextField(isCommentsEnabled);
          }

      });
      
    });
  }, []);
  

  function handleSubmit(event){
    event.preventDefault();

    console.log(`selectedOption : ${selectedOption} textAreaValue:${textAreaValue} otherOptionValue:${otherOptionValue}`)

    const jsonData = {
        report_date: new Date(),
        md_name:"Tester",
        categorical: radioButtonOptions ? radioButtonOptions.filter((ele)=>ele.value === selectedOption).pop().text:null,
        comment:textAreaValue,
        otherOptionValue
      }
      
    const requestOption = {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(jsonData)
    } 
    
    fetch('/api/v1/addNewTag',requestOption)
    .then(res=>res.json())
    .then(data=> {
      if(data.status === 'Success'){
        alert(data.message);
      }
      window.location.reload(false);
    }).catch((error)=> {
      console.log(error);
    });

  }

  return (
    <>
        <section className="flex-child align-text-left">
          <h3>This Page is an example of a</h3>
        <form onSubmit={handleSubmit}>
          {radioButtonOptions.map((ele,idx) => {
             return <div className='checkbox-container' key={idx}>
                 <label >
                  <input
                    type={ele.type}
                    className='sq-radio'
                    key={ele.id}
                    value={ele.value}
                    checked={selectedOption === ele.value}
                    onChange={(changeEvent)=>setSelectedOption(changeEvent.target.value)}
                  />
                  {ele.text}
                  </label> 
              </div>
            })
          }
          {isShowTextField &&
            <>
              <h4>Comments:</h4>
              <textarea value={textAreaValue} style={{width:"400px", height:"150px"}} onChange={(e)=>setTextAreaValue(e.target.value)} />
            </>
          }
            {otherButtonOptions.map((ele,idx) => {
             return <div className='checkbox-container' key={idx} >
                 <label>
                    <input
                      type={ele.type}
                      key={ele.id}
                      defaultChecked={otherOptionValue}
                      value={ele.value}
                      checked={otherOptionValue === ele.value}
                      onChange={(event) => setOtherOptionValue(otherOptionValue !== event.target.value ? event.target.value:'')}
                    />
                  {ele.text}
                  </label> 
              </div>
            })
          }
          <input type="submit" className='submit' value="Submit"></input>
        </form>
        </section>
    </>
  )
}

export default AnnotationPage