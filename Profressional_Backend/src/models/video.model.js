import mongoose, { Schema } from "mongoose";
import mongoooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = mongoose.Schema({
    videoFile:{
        type: String,
        require: true,
    },
    thumbnail:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true,
    },
    duration:{
        type: Number,
        require: true
    },
    view: {
        type: Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"  //It should be avilable in database
    }
},{timestamps: true});

videoSchema.plugin(mongoooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema);