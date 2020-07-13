import { Router } from 'express';

import { error404 } from 'src/controllers/Errors';
import {
    getStudentsJson,
    deleteStudent,
    createStudent,
} from 'src/controllers/Students';

const router = Router();

router.get('/', getStudentsJson);
router.delete('/:id', deleteStudent);
router.post('/create', createStudent);

// Если роутер не выбрал подходящий для запроса маршрут – используется этот
router.all('*', error404);

export default router;
