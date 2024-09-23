import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcryptjs';


// Interface for User Model
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    isBanned?: boolean;

    comparePassword(candidatePassword: string): Promise<boolean>;

    generatePasswordResetToken(): string;
}

// User Schema
const UserSchema: Schema<IUser> = new Schema({
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: ['user', 'admin'], default: 'user'},
        resetPasswordToken: {type: String},
        resetPasswordExpire: {type: Date},
        isBanned: {type: Boolean, default: false}
    },
    {timestamps: true});

// Password hashing before saving
UserSchema.pre('save', async function (next) {
    const user = this as IUser;

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};


export const User = mongoose.model<IUser>('User', UserSchema);



