import {Schema, model} from 'mongoose';

// Interfaz que representa el documento de la colección de personas
export interface IPerson {
    nombre: string;
    edad: number;
    correo: string;
    created: Date;
}

// Squema para la colección de personas
const PersonSchema = new Schema<IPerson>({
    nombre: {type: String, required: true},
    edad: {type: Number, required: true},
    correo: {type: String, required: true},
    created : {type: Date, default: Date.now}
});

export const PersonModel = model<IPerson>('Person', PersonSchema);

