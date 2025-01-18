import express from 'express';
import {
    getAllSettings,
    getSettingByKey,
    createSetting,
    updateSetting,
    deleteSetting
} from '../controllers/settings.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllSettings);
router.get('/:key', getSettingByKey);

// Admin only routes
router.use(protect, authorize('admin', 'administrator'));
router.post('/', createSetting);
router.put('/:key', updateSetting);
router.delete('/:key', deleteSetting);

export default router;