import {Router} from 'express';

import {PetController} from '../controllers/petController';

const router = Router();

const petController = new PetController();

router.get('/', petController.getAll);
router.get('/:id', petController.getOne);
router.post('/', petController.create);
router.put('/:id', petController.update);
router.delete('/:id', petController.delete);

export default router;