import React, { useState } from 'react';
import PdfRenderer from './pdfCreator';
import TextFileReader  from './TextFileReader';

function CustomFileInputComponent() {
  const [imgFile, setImgFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [textFile,setTextFile] = useState(null);

  function handleChange(e){

    const files = e.target.files;

      if (!files.length) 
        return;

    const file = files[0];

    if (file.type === 'application/pdf') {
      setPdfUrl(URL.createObjectURL(file));
      setImgFile(null);
      setTextFile(null);
    }else if(file.type === 'text/plain'){
      setTextFile(files);
      setPdfUrl(null);
      setImgFile(null);
    } else{
      setImgFile(file);
      setPdfUrl(null);
      setTextFile(null);
    }
    
  };


  return (
    <section className='flex-child'>
        <h3>Upload Content</h3>
          <div className='content'>
            <div style={{marginBottom:10}} className='file-uploader'>
              <input type="file" id='file' className='input-file' onChange={handleChange} />
            </div>
              {pdfUrl && 
              <>
              {/* <embed src={pdfUrl} type="application/pdf" width="100%" height="800px" /> */}
               <PdfRenderer src={pdfUrl} />
              </>
              }
              {imgFile &&
                <>
                  <img src={URL.createObjectURL(imgFile)} width="100%" height="800px" alt="Not able to load"/>
                </>
              }
              {textFile &&
              <>
                <TextFileReader src={textFile}/>
              </>
              }

          </div>
    </section>
  );
}

export default CustomFileInputComponent;

