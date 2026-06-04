import propertyModel from "../models/propertyModel.js"

export const compareProperties = async (req,res,next)=>{
    try{

        const { ids } = req.body

        if(!ids || ids.length < 2){
            return res.json({
                error:"Select at least 2 properties"
            })
        }

        const properties = await propertyModel.find({
            _id: { $in: ids }
        })

        if(properties.length < 2){
            return res.json({
                error:"Properties not found"
            })
        }

        return res.json({
            message:"Comparison data",
            properties
        })

    }catch(error){
        next(error)
    }
}