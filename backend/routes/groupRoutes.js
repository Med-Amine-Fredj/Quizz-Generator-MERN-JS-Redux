import express from 'express'
const router = express.Router() 
import { addGroup, getAllGroups, deleteGroupe, updateGroupe, getGroupById } from '../controllers/groupController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.route('/addgroup').put(protect, admin, addGroup)
router.route('/').get(protect, admin, getAllGroups)
router.route('/:id').delete(protect, admin, deleteGroupe).put(protect, admin, updateGroupe).get(protect, admin, getGroupById)







export default router