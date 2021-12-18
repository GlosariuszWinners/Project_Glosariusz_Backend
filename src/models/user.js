import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = mongoose.Schema(
    {
        login: {
            type: String,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(passportLocalMongoose, { usernameField: 'login' })

export default mongoose.model('User', userSchema)
