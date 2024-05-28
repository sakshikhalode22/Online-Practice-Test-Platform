const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/practice-test-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));


const UserSchema = new mongoose.Schema(
    {
        id: {
        type: Number,
        unique: true,
        required: true,
        },
        name: {
        type: String,
        required: true,
        },
        address: {
        type: String,
        },
        email: {
        type: String,
        unique:true,
        required: true,
        },
        phoneNo: {
        type: Number,
        required: true,
        },
        grade:{
        type: Number,
        required: true,
        },
        password: {
        type: String,
        required: true,
        },
    },
    {
        timestamps: {
        createdAt: true,
        updatedAt: true,
        },
    }
    );
const Users = mongoose.model('Users', UserSchema);

module.exports ={Users}
