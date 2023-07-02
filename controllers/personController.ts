import { PersonModel, IPerson } from "../models/person";
import { Request, Response, NextFunction } from "express";
// Solo ejemplo de los tipos de datos
import { HydratedDocument } from "mongoose";

export class PersonController {

    async create(req:Request, res:Response, next:NextFunction) {
        try {
            const person: HydratedDocument<IPerson> = new PersonModel(req.body);
            await person.save();
            res.json({mensaje: 'Persona creada con éxito'});

        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al crear la persona'});
        }
    }

    async getAll(req:Request, res:Response, next:NextFunction) {
        try{
            const persons: HydratedDocument<IPerson>[] = await PersonModel.find();
            res.json(persons);
        }catch(error:any){
            res.status(500).json({mensaje: error.message || 'Error al listar las mascotas'});
        }
    }

    async getOne(req:Request, res:Response, next:NextFunction) {
        try {
            const person = await PersonModel.findById(req.params.id);
            if (!person) return res.status(404).json({mensaje: 'No se encontro la persona'});
            res.json(person);
        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al listar la persona'});
        }
    }

    async update(req:Request, res:Response, next:NextFunction) {

        const {id} = req.params;
        if(!req.body) return res.status(404).json({mensaje: 'No se recibieron datos'});

        if (id!==req.body._id) return res.status(404).json({mensaje: 'El id no coincide'});

        try {
            const personUpdate = await PersonModel.findByIdAndUpdate(id, req.body, {new: true});
            if (!personUpdate) return res.status(404).json({mensaje: 'No se encontro la persona'});
            res.json(personUpdate);
        } catch (error:any) {
            res.status(500).json({mensaje: error.message || 'Error al actualizar la persona'});
        }
    }

    async delete(req:Request, res:Response, next:NextFunction) {
        const {id} = req.params;
        try {
            const personDelete = await PersonModel.findByIdAndDelete(id);
            if (!personDelete) return res.status(404).json({mensaje: 'No se encontro la persona'});
            res.json(personDelete);
        } catch (error: any) {
            res.status(500).json({mensaje: error.message || 'Error al eliminar la persona'});
        }
    }
}