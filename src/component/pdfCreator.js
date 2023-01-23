import React,{ useState } from 'react';
const reactPdf = require('react-pdf/dist/esm/entry.webpack5');
const { Document, Page } = reactPdf
// import {pdfjs,Document,Page} from 'react-pdf';
// import url from "pdfjs-dist/build/pdf.worker";

// pdfjs.GlobalWorkerOptions.workerSrc = url;


const PdfRenderer = (props) =>{

    const [numPages,setNumPages] =  useState(null);
    const [pageNumber,setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
    }

    function getTextContentFunc(event){
        console.log(event);
    }

    return(
        <>
            <Document file={props.src}
            onLoadSuccess={onDocumentLoadSuccess}
            >
            <Page pageNumber={pageNumber} getTextContent={getTextContentFunc} ></Page>
            </Document>
        </>
    )

}

export default PdfRenderer;