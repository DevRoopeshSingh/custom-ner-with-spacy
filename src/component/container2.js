import React,{useState} from 'react'

const radioButtonOption =  [
  {
    id:1,
    type:'checkbox',
    value:'option1',
    text:'Progress Note 1'
  },
  {
    id:2,
    type:'checkbox',
    value:'option2',
    text:'Lab report'
  },
  {
    id:3,
    type:'checkbox',
    value:'option3',
    text:'Pathology report'
  },
  {
    id:4,
    type:'checkbox',
    value:'option4',
    text:'Chemo order'
  },
  {
    id:5,
    type:'checkbox',
    value:'option5',
    text:'Chemo order'
  },
  {
    id:6,
    type:'checkbox',
    value:'option6',
    text:'Other'
  },
  {
    id:7,
    type:'checkbox',
    value:'option7',
    text:"I can`t tell"
  }
]

const otherOption =  [
  {
    id:9,
    type:'checkbox',
    value:'option8',
    text:'Check if poor quality OCR'
  }
]

const Container2 = () => {

  const [selectedOption, setSelectedOption ] =  useState('option1');
  const [textAreaValue,setTextAreaValue] =  useState("");
  const [otherOptionChecked, setOtherOptionChecked] = useState(false);
  

  function handleSubmit(event){
    event.preventDefault();

    console.log(`selectedOption : ${selectedOption}
                textAreaValue:${textAreaValue}
                otherOptionChecked:${otherOptionChecked}`
               )
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
          <h4>Comments:</h4>
          <textarea value={textAreaValue} style={{width:"400px", height:"150px"}} onChange={(e)=>setTextAreaValue(e.target.value)} />
          {otherOption.map((ele,idx) => {
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
          <input type="submit" className='submit' value="submit"></input>
        </form>
        </section>
    </>
  )
}

export default Container2