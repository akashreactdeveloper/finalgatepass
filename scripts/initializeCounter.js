const mongoose = require('mongoose');
const Counter = require('./counterModel'); // Adjust the path as needed

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb+srv://crfmsocial:%40Crfm564@crfm.esvjqsd.mongodb.net/CRFM?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        initializeCounter().then(() => {
            console.log('Counters initialized successfully');
            mongoose.disconnect();
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const initializeCounter = async () => {
    const types = ['CRFM', 'AWL'];
    for (const type of types) {
        const counterId = `gatepassNumber_${type}`;
        const counter = await Counter.findById(counterId);
        if (!counter) {
            const newCounter = new Counter({ _id: counterId, sequence_value: 0 });
            await newCounter.save();
        }
    }
};
