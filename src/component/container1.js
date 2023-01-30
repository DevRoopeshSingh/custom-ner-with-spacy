import React, { useState } from 'react';
import PdfRenderer from './pdfCreator';

function Container1() {
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  function handleChange(e){
    if(!e.target.files[0])
      return false;
    
   const name =  e.target.files[0].name;
   const file = e.target.files[0];
   const fileType = name.split('.').pop().toLowerCase();  

    if (file.type === 'application/pdf') {
      setFile(null);
      setPdf(file);
      setPdfUrl(URL.createObjectURL(file));
    }else{
      setPdf(null);
      setPdfUrl(null);
      setFile(file);
    } 
  };


  return (
    <section className='flex-child'>
        <h3>Upload Content</h3>
          <div className='content'>
            <div style={{marginBottom:10}} className='file-uploader'>
              <input type="file" onChange={handleChange} />
            </div>
              {pdfUrl && 
              //  <embed src={pdfUrl} type="application/pdf" width="100%" height="800px" />
               <PdfRenderer src={pdfUrl} />
              }
              {pdf && <p>{pdf.name}</p>}
              {file && <img src={URL.createObjectURL(file)} width="100%" height="800px" alt="Not able to load"/>}
              {file && <p>{file.name}</p>}
            
          </div>
    </section>
  );
}

export default Container1;

