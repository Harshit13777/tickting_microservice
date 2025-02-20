import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { transform } from "typescript";

interface TicketAttrs {
   title:string;
   price:number;
   userId:string;
   
}
// interface described that User Model ha property
// which is attached to it
interface TicketModal extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

// interface that describe the property 
// that user model contain
interface TicketDoc extends mongoose.Document {
    title:string;
   price:number;
   userId:string;
    version:number
}


const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userId:{
        type:String,
        required:true
    }
}, {
    toJSON: {//this method run when 'user' object will convert to JSON string
        transform(doc, ret) {
            ret.id = ret._id;
        
            delete ret._id;
            delete ret.__v;
        }
    }
});

TicketSchema.set('versionKey', 'version');
TicketSchema.plugin(updateIfCurrentPlugin);

//attaching a method to User whcih return a User Model
TicketSchema.statics.build = (attr: TicketAttrs) => {
    return new Ticket(attr);//this create a new entry in mongo
}
const Ticket = mongoose.model<TicketDoc, TicketModal>('Ticket', TicketSchema);




export { Ticket }