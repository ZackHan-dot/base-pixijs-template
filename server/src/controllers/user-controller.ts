import passport from '@/config/passport-config';
import { UserService } from '@/services/user-service';
import { Context } from 'koa';
import { Ctx, Get, JsonController, UseBefore } from 'routing-controllers';
import { Inject, Service } from 'typedi';

@Service()
@JsonController('/user')
export class AppController {
    @Inject()
    userService!: UserService;

    @Get('/profile')
    @UseBefore(passport.authenticate('jwt', { session: false }))
    async getProfile(@Ctx() ctx: Context) {
        const authenticatedUser = ctx.state.user;
        const user = await this.userService.getUserProfile(
            authenticatedUser.id
        );
        const userInfo = {
            id: user?.id,
            username: user?.username,
            email: user?.email,
        };
        return {
            code: 0,
            data: userInfo,
            message: 'success',
        };
    }
}
