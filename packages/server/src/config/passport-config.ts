import MagicLoginStrategy from 'passport-magic-login';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/utils';
import { getOrCreateUserWithEmail } from '@/helpers/auth';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getRepository } from 'typeorm';
import { User } from '@/models/user-entity';

// 配置 MagicLoginStrategy
export const magicLogin = new MagicLoginStrategy({
    // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
    secret: process.env.MAGIC_LINK_SECRET!,

    // The authentication callback URL
    callbackUrl: '/auth/login/callback',

    // Called with th e generated magic link so you can send it to the user
    // "destination" is what you POST-ed from the client
    // "href" is your confirmUrl with the confirmation token,
    // for example "/auth/magiclogin/confirm?token=<longtoken>"
    sendMagicLink: async (destination, href) => {
        const loginLink = `${process.env.MAGIC_LINK_PREFIX}${href}`;
        await sendEmail({
            to: destination,
            subject: '登录链接',
            text: `本次登录链接为：${loginLink}`,
            html: `<p>本次登录链接为：<a href="${loginLink}" target="_blank">${loginLink}</a></p>`,
        });
    },

    // Once the user clicks on the magic link and verifies their login attempt,
    // you have to match their email to a user record in the database.
    // If it doesn't exist yet they are trying to sign up so you have to create a new one.
    // "payload" contains { "destination": "email" }
    // In standard passport fashion, call callback with the error as the first argument (if there was one)
    // and the user data as the second argument!
    verify: async (payload, callback) => {
        // Get or create a user with the provided email from the database
        try {
            const user = await getOrCreateUserWithEmail(payload.destination);
            const userInfo = { id: user.id, email: user.email };
            callback(null, userInfo);
        } catch (error: any) {
            callback(error);
        }
    },

    // Optional: options passed to the jwt.sign call (https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)
    jwtOptions: {
        expiresIn: '5m',
    },
});

passport.use(magicLogin);

// 配置 JwtStrategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await getRepository(User).findOne(jwtPayload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

export const generateJwtToken = (user: { id: number; email: string }) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        {
            algorithm: 'HS256',
            expiresIn: '15h',
        }
    );
};

export default passport;
