import { Router } from 'express';
import StudentsRouter from 'src/routes/Students';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/students', StudentsRouter);

// Export the base-router
export default router;
