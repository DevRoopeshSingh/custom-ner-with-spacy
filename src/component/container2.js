import React,{useState,useEffect} from 'react'

// const radioButtonOption =  [
//   {
//     id:1,
//     type:'checkbox',
//     value:'option1',
//     text:'Progress Note  changed'
//   },
//   {
//     id:2,
//     type:'checkbox',
//     value:'option2',
//     text:'Lab report'
//   },
//   {
//     id:3,
//     type:'checkbox',
//     value:'option3',
//     text:'Pathology report'
//   },
//   {
//     id:4,
//     type:'checkbox',
//     value:'option4',
//     text:'Imaging report'
//   },
//   {
//     id:5,
//     type:'checkbox',
//     value:'option5',
//     text:'Chemo order'
//   },
//   {
//     id:6,
//     type:'checkbox',
//     value:'option6',
//     text:'Other'
//   },
//   {
//     id:7,
//     type:'checkbox',
//     value:'option7',
//     text:"I can`t tell"
//   }
// ]

const otherOption =  [
  {
    id:9,
    type:'checkbox',
    value:'option8',
    text:'Check if poor quality OCR'
  }
]

const Container2 = () => {

  const [selectedOption, setSelectedOption ] =  useState('');
  const [textAreaValue,setTextAreaValue] =  useState("");
  const [otherOptionChecked, setOtherOptionChecked] = useState(false);
  const [radioButtonOption,setRadioButtonOption] =  useState([]);
  const [otherButtonOptions,setOtherButtonOptions] =  useState([]);
  const [isShowTextField,setIsShowTextField] =  useState(false);
  
  function funcFormObject(ele,index){
    return { id:index,
      type:'checkbox',
      value:'option'+index,
      text:ele
    }
  }

  useEffect(() => {
    fetch('/fetchTag').then(res => res.json()).then(data => {
      const allData =  data.fields;

      allData.forEach((element) => {

          if(element['report_type']){
           const categoricalData =  element['report_type']['categorical'] ? element['report_type']['categorical'].pop(): element['report_type']['categorical']
           const formattedData =  categoricalData.map((ele,index)=>funcFormObject(ele,index)) 
           setRadioButtonOption(formattedData);
          }
          else if(element['whether']){
           const categoricalData = element['whether']['categorical'] ?  element['whether']['categorical'].pop(): element['whether']['categorical'];
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

    console.log(`selectedOption : ${selectedOption}
                textAreaValue:${textAreaValue}
                otherOptionChecked:${otherOptionChecked}`
               )
    const jsonData = {
        report_date: new Date(),
        md_name:"Tester",
        categorical: radioButtonOption ? radioButtonOption.filter((ele)=>ele.value === selectedOption).pop().text:null
      }
      
    const requestOption = {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(jsonData)
    } 
    
    fetch('/addNewTag',requestOption)
    .then(res=>res.json())
    .then(data=>console.log('Post Id',data.id));

  }

  return (
    <>
        <section className="flex-child align-text-left">
          <h3>This Page is an example of a</h3>
        <form onSubmit={handleSubmit}>
          {
           radioButtonOption.map((ele,idx) => {
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
            <div>
              <h4>Comments:</h4>
              <textarea value={textAreaValue} style={{width:"400px", height:"150px"}} onChange={(e)=>setTextAreaValue(e.target.value)} />
            </div>
          }
            {otherButtonOptions.map((ele,idx) => {
             return <div className='checkbox-container' key={idx} >
                 <label>
                    <input
                      type={ele.type}
                      key={ele.id}
                      defaultChecked={otherOptionChecked}
                      onChange={() => setOtherOptionChecked(!otherOptionChecked)}
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

export default Container2