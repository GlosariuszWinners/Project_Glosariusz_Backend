// required environment variables
['NODE_ENV'].forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    }
});

export default {
    env: process.env.NODE_ENV,
    server: {
        port: Number(process.env.PORT) || 8080,
    },
};
