import React from 'react'
import CustomFileInputComponent from './CustomFileInputComponent';
import AnnotationPage from './AnnotationPage';
import './style.scss'

const MainPage = () => {
  return (
      <React.Fragment>
          <section>
            <div className='flex-container'>
                    <CustomFileInputComponent />
                    <AnnotationPage />
            </div>
          </section>
      </React.Fragment>
  )
}

export default MainPage