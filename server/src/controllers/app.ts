import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class AppController {
    @Get('/hello')
    hello() {
        return {
            code: 0,
            data: [],
            message: 'success',
        };
    }
}
