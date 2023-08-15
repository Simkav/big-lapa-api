import { DogCard } from './dog-card.model';
import { DogCardService } from './dog-card.service';
import { Response } from 'express';
export declare class DogCardController {
    private readonly dogCardService;
    constructor(dogCardService: DogCardService);
    createDogCard(data: DogCard): Promise<DogCard>;
    getAllDogCards(): Promise<DogCard[]>;
    getDogCardById(id: string, res: Response): Promise<void>;
    deleteDogCard(id: string, res: Response): Promise<void>;
}
