import {Document, Schema, model, ObjectId} from 'mongoose';

export interface IEvent extends Document {
    title: String;
    notes: String;
    start: Date;
    end: Date,
    user: ObjectId;
}

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

export default model<IEvent>('Event', EventSchema);