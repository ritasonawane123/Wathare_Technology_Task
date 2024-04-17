const { default: mongoose } = require('mongoose');
const Data = require('./models/Data');

mongoose.connect('mongodb://127.0.0.1:27017/project-db')
.then(() => {
    console.log('MongoDB connected');

    const jsonData = require('./data.json');

    Data.insertMany(jsonData)
    .then(docs => {
        console.log('Data imported successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });

})
.catch(err => console.error(err));
