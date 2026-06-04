import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProperties } from '../redux/thunks/propertyThunks'


const Rentals = () => {

  const dispatch = useDispatch()
  const {properties,loading,error} = useSelector((state)=>state.properties)

  useEffect(()=>{
    dispatch(fetchProperties())
  },[])

  return (
    <div>
      <h1>All properties</h1>
      {loading && <p>Loading....</p>}
      {error && <p>{error}</p>}
      
      <div>
        {properties.map((property) =>{

          return(
          <div key={property._id}>
            <img src={property.image}
                alt={property.title}
                width="250"/>
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p>{property.price}</p>  
          </div>
          )

        })}
      </div>

    </div>
  )
}

export default Rentals