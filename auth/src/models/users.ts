import mongoose from "mongoose";
import { Password } from "../services/password";
import { transform } from "typescript";

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
    },
}, {
    toJSON: {//this method run when 'user' object will convert to JSON string
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.password;
            delete ret._id;
            delete ret.__v;
        }
    }
});

//middleware provided by mongodb function after 'save' called
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword)
    }
    done()
})

//attaching a method to User whcih return a User Model
userSchema.statics.build = (attr: UserAttrs) => {
    return new User(attr);//this create a new entry in mongo
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);




export { User }