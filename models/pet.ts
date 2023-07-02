import {Schema, model} from 'mongoose';

// Interfaz que representa el documento de la colección de mascotas
export interface IPet{
    nombre: string;
    edad: number;
    raza: string;
}

// Squema para la colección de mascotas
const PetSchema = new Schema<IPet>({
    nombre: {type: String, required: true},
    edad: {type: Number, required: true},
    raza: {type: String, required: true}
});

export const PetModel = model<IPet>('Pet', PetSchema);
