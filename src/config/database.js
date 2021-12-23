export default {
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/glossary',
    settings: {
        useNewUrlParser: true,
    },
};
