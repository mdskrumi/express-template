import TestModel from '@/modules/test/test.model';
import Test from '@/modules/test/test.interface';
import HttpException from '@/utils/exceptions/http.exception';

class UserService {
    private test = TestModel;

    public async create(test: Test): Promise<Test> {
        try {
            return await this.test.create(test);
        } catch (error: HttpException | any) {
            throw error;
        }
    }

    public async get(): Promise<Test[]> {
        try {
            return await this.test.find();
        } catch (error: HttpException | any) {
            throw error;
        }
    }
}

export default UserService;
