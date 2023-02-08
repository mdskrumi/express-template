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

    public async getbyId(id: string): Promise<Test | null> {
        try {
            return await this.test.findOne({ _id: id });
        } catch (error: HttpException | any) {
            throw new HttpException(404, 'Can not get the item');
        }
    }

    public async deletebyId(id: string): Promise<Test | null> {
        try {
            return await this.test.findOneAndRemove({ _id: id });
        } catch (error: HttpException | any) {
            throw new HttpException(400, 'Can not remove the item');
        }
    }
}

export default UserService;
