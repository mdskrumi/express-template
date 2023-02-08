import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        APP_ENV: str({
            choices: ['development', 'staging', 'production'],
        }),
        MONGO_PATH: str(),
        PORT: port({ default: 3000 }),
    });
}

export default validateEnv;
