export default () => {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        database: {
            client: process.env.DATABASE_CLIENT,
            host: process.env.HOST,
            port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
            username: process.env.USERNAME,
            password: process.env.PASSWORD || '',
            name: process.env.NAME,
        },
    };
};