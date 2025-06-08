require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.use('/auth', require('./routes/auth'));
app.use('/courses', require('./routes/courses'));

app.listen(3000, () => console.log('Server on http://localhost:3000'));
