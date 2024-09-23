import mongoose, {Schema, Document} from 'mongoose';

export interface IPost extends Document {
    content: string;
    user: mongoose.Types.ObjectId;
}

const PostSchema: Schema<IPost> = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true});

export const Post = mongoose.model<IPost>('Post', PostSchema);
