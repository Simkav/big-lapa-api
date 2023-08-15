import { MainService } from './mainPage.service';
import { MainDto } from './dto/mainPage.dto';
import { MainModel } from './mainPage.model/mainPage.model';
export declare class MainController {
    private readonly mainService;
    constructor(mainService: MainService);
    create(dto: MainDto): Promise<import("@typegoose/typegoose").DocumentType<MainModel>>;
    getMainData(): Promise<MainModel>;
}
