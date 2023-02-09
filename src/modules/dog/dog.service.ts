import DogModel from '@/modules/dog/dog.model';
import Dog from '@/modules/dog/dog.interface';
import HttpException from '@/utils/exceptions/http.exception';

class DogService {
    private dog = DogModel;

    public async create(dog: Dog): Promise<Dog> {
        try {
            return await this.dog.create(dog);
        } catch (error: HttpException | any) {
            throw error;
        }
    }

    public async get(): Promise<Dog[]> {
        try {
            return await this.dog.find();
        } catch (error: HttpException | any) {
            throw error;
        }
    }

    public async getbyId(id: string): Promise<Dog | null> {
        try {
            return await this.dog.findOne({ _id: id });
        } catch (error: HttpException | any) {
            throw new HttpException(404, 'Can not get the item');
        }
    }

    public async deletebyId(id: string): Promise<Dog | null> {
        try {
            return await this.dog.findOneAndRemove({ _id: id });
        } catch (error: HttpException | any) {
            throw new HttpException(400, 'Can not remove the item');
        }
    }
}

export default DogService;
