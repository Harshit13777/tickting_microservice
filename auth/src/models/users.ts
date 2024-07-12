import mongoose from "mongoose";

interface UserAttrs {
    email: string,
    password: string
}
// interface described that User Model ha property
// which is attached to it
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// interface that describe the property 
// that user model contain
interface UserDoc extends mongoose.Document {
    email: string,
    password: string,

}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

//attaching a method to User whcih return a User Model
userSchema.statics.build = (attr: UserAttrs) => {
    return new User(attr);
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);




export { User }