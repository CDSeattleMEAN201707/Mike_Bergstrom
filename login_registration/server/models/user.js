var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    // user email - unique, regex, required
    email: {
        type: String,
        required: [true, "Email can not be blank"],
        trim: true,
        unique: true,
        validate: {
            validator: function(email){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "email not in proper format"
        }
    },

    // first_name - regex, required
    first_name: {
        type: String,
        required: [true, "First name can not be blank"],
        trim: true,
        validate: {
            validator: function(name){
                return /^[a-zA-Z]+$/.test(name);
            },
            message: "First name must be letters only"
        }
    },

    // last_name - regex, required
    last_name: {
        type: String,
        required: [true, "Last name can not be blank"],
        trim: true,
        validate: {
        validator: function(name){
            return /^[a-zA-Z]+$/.test(name);
        },
        message: "Last name must be letters only"
        }
    },

    // password - regex, required, min 8, max 32, match confirm
    password: {
        type: String,
        required: [true, "Password can not be blank"],
        minlength: 8,
        maxlength: 32,
        validate: {
            validator: function( value ) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }

    },

    // birthday - required, at least 16 year old
    birthday: {
        type: Date,
        required: [true, "Birthday can not be blank"],
        trim: true,
        validate: {
            validator: function( birthday ) {
                // console.log(birthday.getTime())
                // console.log(Date.now())
                return ((Date.now() - (24*3600*1000*365*16))> birthday.getTime());
            },
            message: "Must be 16 years or older to use this site"
        }
        
    },
}, {timestamps: true})

UserSchema.pre('save', function(done){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    console.log(this.password)
    done();
})

var User = mongoose.model('User', UserSchema);