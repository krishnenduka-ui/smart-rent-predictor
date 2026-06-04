import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProperties } from '../redux/thunks/propertyThunks'



const Rentals = () => {

  const dispatch = useDispatch()
  const {properties,loading,error} = useSelector((state)=>state.properties)


  const [location,setLocation] = useState("")
  const [bedrooms,setBedrooms] = useState("")
  const [bathrooms,setBathrooms] = useState("")
  const [propertyType,setPropertyType] = useState("")
  const [minPrice,setMinPrice] = useState("")
  const [maxPrice,setMaxPrice] = useState("")
  const [amenities,setAmenities] = useState([])
  const [sort,setSort] = useState("")

  useEffect(()=>{
    dispatch(fetchProperties())
  },[])

  const handleAmenities = (e) =>{
    const {value,checked} = e.target

    setAmenities((prev) =>
      checked? [...prev,value]:prev.filter((amenity) => amenity !== value)
    )

  }

  const handleSearch = () =>{
    dispatch(fetchProperties({
      location,bedrooms,bathrooms,propertyType,minPrice,maxPrice,amenities:amenities.join(","),sort
    })
  )
  }

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="text-center mb-10"> 
        <h1 className="text-4xl font-bold text-gray-800"> 
          Browse Rentals 
          </h1> 
        <p className="text-gray-600 mt-3"> 
          Find your perfect rental property 
        </p> 
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> 
        
        {/* ========================= Sidebar Filters ========================= */} 
        <div className="bg-white p-5 rounded-xl shadow-md h-fit"> 
          <h2 className="text-2xl font-semibold mb-5"> 
            Filters 
          </h2>
           {/* Location */} 
        <div className="mb-4">
        <input type='text' 
              placeholder='search location' 
              value={location} 
              onChange={(e) =>setLocation(e.target.value)}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>

      <div className="mb-4">
        <select value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full border p-3 rounded-lg"
        >
          <option value="">Bedrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
           <option value="3+">3+Bedrooms</option>

        </select>
        </div>
    <div className="mb-4">
        <select value={bathrooms}
                onChange={(e)=> setBathrooms(e.target.value)}
                className="w-full border p-3 rounded-lg"
        >
          <option value="">Bathrooms</option>
          <option value="1">1 Bathrooms</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="3+">3+ Bathrooms</option>

        </select>
      </div>
<div className="mb-4">
        <select value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border p-3 rounded-lg"
        >
          <option value="">Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="house">House</option>

        </select>
        </div>
<div className="grid grid-cols-2 gap-3 mb-4">
        <input type='number'
              placeholder='minimum price range'
              value={minPrice}
              onChange={(e)=>setMinPrice(e.target.value)}
              className="border p-3 rounded-lg"
        />

        <input type='number'
              placeholder='maximum price range'
              value={maxPrice}
              onChange={(e)=>setMaxPrice(e.target.value)}
              className="border p-3 rounded-lg"
        />
        </div>
<div className="mb-4">
        <select value={sort} onChange={(e)=>setSort(e.target.value)}
          className="w-full border p-3 rounded-lg">
          <option value="">Sort</option>
          <option value="price">Low to High</option>
          <option value="-price">High to low</option>
        </select>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-3"> Amenities </h3>
        <div className="space-y-2">
        <label className="flex items-center gap-2">Pool</label><input type='checkbox' value="pool" onChange={handleAmenities}/>
        <label className="flex items-center gap-2">Parking</label><input type='checkbox' value="parking" onChange={handleAmenities}/>
        <label className="flex items-center gap-2">Gym</label><input type='checkbox' value="gym" onChange={handleAmenities}/>
        <label className="flex items-center gap-2">Security</label><input type='checkbox' value="security" onChange={handleAmenities}/>
</div>

        <button onClick = {handleSearch} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" >Search</button>
      </div>


      </div>

<div className="lg:col-span-3">

      {loading && <p className="text-center text-lg">Loading....</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) =>{

          return(
          <div key={property._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src={property.image}
                alt={property.title}
                width="250"
                className="w-full h-52 object-cover"
                />
                <div className="p-4">
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-500 mt-1">{property.location}</p>
            <p className="text-blue-600 font-bold text-lg mt-2">{property.price}</p> 
            <div className="flex justify-between mt-4 text-sm text-gray-600"> 
              <span> {property.bedrooms} Beds </span> 
              <span> {property.bathrooms} Baths </span> 
            </div> 
            <p className="mt-3 inline-block bg-gray-200 px-3 py-1 rounded-full text-sm"> {property.propertyType} </p> 
          </div>
          </div>
          )

        })}
      </div>

    </div>
    </div>
    </div>
  )
}

export default Rentals