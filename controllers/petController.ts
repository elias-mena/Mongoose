import { PetModel } from "../models/pet";
import { Request, Response } from "express";

export class PetController {

    async create(req:Request, res:Response, next:Function) {
        try {
            const pet = new PetModel(req.body);
            await pet.save();
            res.json({mensaje: 'Mascota creada con éxito'});

        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al crear la mascota'});
        }
    }

    async getAll(req:Request, res:Response, next:Function) {
        try{
            const pets = await PetModel.find();
            res.json(pets);

        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al listar las mascotas'});
        }
    }

    async getOne(req:Request, res:Response, next:Function) {
        try {
            const pet = await PetModel.findById(req.params.id);
            if (!pet) return res.status(404).json({mensaje: 'No se encontro la mascota'});
            res.json(pet);

        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al listar la mascota'});
        }
    }

    async update(req:Request, res:Response, next:Function) {
        const {id} = req.params;
        if(!req.body) return res.status(404).json({mensaje: 'No se recibieron datos'});

        if (id!==req.body._id) return res.status(404).json({mensaje: 'El id no coincide'});

        try {
            const petUpdate = await PetModel.findByIdAndUpdate(id, req.body, {new: true});
            if (!petUpdate) return res.status(404).json({mensaje: 'No se encontro la persona'});
            res.json(petUpdate);
        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al actualizar la mascota'});
        }
    }

    async delete(req:Request, res:Response, next:Function) {
        const {id} = req.params;
        try {
            const petDelete = await PetModel.findByIdAndDelete(id);
            if (!petDelete) return res.status(404).json({mensaje: 'No se encontro la persona'});
            res.json(petDelete);
        } catch (error: any) {
            res.status(500).json({mensaje: error.message || 'Error al eliminar la mascota'});
        }
    }
}