import * as dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import UserController from '@/modules/user/user.controller';
import TestController from '@/modules/test/test.controller';
import DogController from './modules/dog/dog.controller';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

validateEnv();

const app = new App(
    [new UserController(), new TestController(), new DogController()],
    Number(process.env.PORT)
);

app.listen();
