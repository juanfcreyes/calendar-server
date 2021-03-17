import mongoose  from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        console.log(process.env.DB_CNN);
        console.log('DB Online');
    } catch (error) {
        console.error(error);
        throw new Error("Error initialization db");
        
    }
}