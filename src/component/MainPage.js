import React from 'react'
import Container1 from './container1';
import Container2 from './container2';
import './style.scss'

const MainPage = () => {
  return (
      <React.Fragment>
          <section>
            <div className='flex-container'>
                    <Container1 />
                    <Container2 />
            </div>
          </section>
      </React.Fragment>
  )
}

export default MainPage