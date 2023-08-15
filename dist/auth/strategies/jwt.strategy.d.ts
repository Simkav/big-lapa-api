import { ConfigService } from '@nestjs/config';
import { UserModel } from '../auth.model/auth.model';
declare const JwtStratagy_base: new (...args: any[]) => any;
export declare class JwtStratagy extends JwtStratagy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate({ userName }: Pick<UserModel, 'userName'>): Promise<string>;
}
export {};
