import { useState, useEffect, Fragment } from 'react'
import './App.css'
import redditApiImageGetter from 'reddit-api-image-getter'
import ImageView from './components/ImageView'

function App() {
  const [imgHolder, setImgHolder] = useState(null)

  useEffect(() => {
    console.log(imgHolder)
  }, [imgHolder])

  useEffect(() => {
    let getter = new redditApiImageGetter()

    getter.getHotImagesOfSubReddit('ProgrammerHumor').then(function (result) {
      setImgHolder(result.filter((index) => index.imageUrl != undefined))
    }).catch(function (error) {
      console.log(error)
    })
  }, [])
  
  

  // const lenis = new Lenis()

  // lenis.on('scroll', (e) => {
  //   console.log(e)
  // })

  // function raf(time) {
  //   lenis.raf(time)
  //   requestAnimationFrame(raf)
  // }

  // requestAnimationFrame(raf)


 

  return (
    <div>
      <ImageView/>
     
      <div className="grid grid-cols-5 grid-rows-6 h-screen">
      {imgHolder != null ? imgHolder.map((imageObject, index) => {
         return (
          <Fragment key={index}>
            <a href={imageObject.url}>
              {imageObject.imageUrl != undefined ? <img className='overflow-hidden min-h-auto' src={imageObject.imageUrl}/> : <p> "No image supplied"</p>} 
            </a>
          </Fragment>
         )
        }) : null}
    </div>
      
      
    </div>
  )
}

export default App
