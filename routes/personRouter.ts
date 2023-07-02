import {Router} from 'express';

import {PersonController} from '../controllers/personController';

const router = Router();

const personController = new PersonController();

router.get('/', personController.getAll);
router.get('/:id', personController.getOne);
router.post('/', personController.create);
router.put('/:id', personController.update);
router.delete('/:id', personController.delete);

export default router;