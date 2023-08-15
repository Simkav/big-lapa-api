import { ConfigService } from '@nestjs/config';
import BackBlazeB2 from 'backblaze-b2';
export declare const backBlazeFactory: (configService: ConfigService) => Promise<BackBlazeB2>;
