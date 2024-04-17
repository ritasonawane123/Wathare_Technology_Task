const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT ||5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/project-db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
