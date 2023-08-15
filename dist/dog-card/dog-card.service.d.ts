/// <reference types="mongoose/types/models" />
import { DogCard } from './dog-card.model';
import { Model } from 'mongoose';
export declare class DogCardService {
    private dogCardModel;
    constructor(dogCardModel: Model<DogCard>);
    createDogCard(data: DogCard): Promise<DogCard>;
    getDogCardById(id: string): Promise<DogCard | null>;
    getAllDogCards(): Promise<DogCard[]>;
    deleteDogCardById(id: string): Promise<void>;
}
