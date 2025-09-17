
import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name : {type : String, require:true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
})

const SubCategory = mongoose.model("SubCategory", SubCategorySchema)

export default SubCategory