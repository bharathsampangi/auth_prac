import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
    googleId: string
}

export const userSchema = new Schema({
    googleId: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);
export default User;