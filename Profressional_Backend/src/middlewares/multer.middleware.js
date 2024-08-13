import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){     //Where our file will be store
        cb(null,"./public/temp");
    },
    filename: function(req,file,cb){    //What will be the file name
        cb(null, file.originalname)     //We take it original name of that file but, we should not store them in that way
    }                                   //Because, it may override any file
})

export const upload = multer({
    storage:storage
})