let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 1
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (input) => {
                return /.*@?*\..*/.test(input)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32
    },
    profileUrl: String
})

// Use bcrypt to hash password

// Ensure that password doesn't get sent with the rest of the data
userSchema.set('toJSON', {
    trasform: (doc, user) => {
        delete user.password
        return user
    }
})

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 12)
    next()
})

// Create a helper function to compare the password hashes
userSchema.methods.isAuthenticated = function(typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password)
}



module.exports = mongoose.model('User', userSchema)