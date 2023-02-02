import React from 'react'
import AnnotationPage1 from './AnnotationPage1';
import AnnotationPage2 from './AnnotationPage2';
import './style.scss'

const MainPage = () => {
  return (
      <React.Fragment>
          <section>
            <div className='flex-container'>
                    <AnnotationPage1 />
                    <AnnotationPage2 />
            </div>
          </section>
      </React.Fragment>
  )
}

export default MainPage