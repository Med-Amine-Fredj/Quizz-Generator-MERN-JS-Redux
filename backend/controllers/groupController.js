import asyncHandler from 'express-async-handler'
import Groupes from '../models/groupesModel.js'
import generateToken from '../utils/generateToken.js'


 // @desc Add new groupe 
// @route POST /admin/groupes/addgroup
// @acess Private /admin
const addGroup = asyncHandler(async(req,res) => {
    const { nomGroupe, descriptionGroupe, nomMembres, emailMembres} =  req.body
 
    const groupeExists = await Groupes.findOne({ nomGroupe })
 
    if ( groupeExists ) {
        res.status(400) 
        throw new Error('Group Already Exist !')
    }


    const group = await Groupes.create({
        nomGroupe,
        descriptionGroupe,
        nomMembres,
        emailMembres
    })


    if (group) {
        res.status(201).json({
            nomGroupe,
            descriptionGroupe,
            nomMembres,
            emailMembres
        })
    } else {
        res.status(400)
        throw new Error('Invalid Group Data')
    }
 })


 // @desc GET all Groups
// @route GET /admin/groupes
// @acess Private /admin
const getAllGroups = asyncHandler(async(req,res) => {
    const groups = await Groupes.find()
    res.json(groups)
 })



   // @desc Delete Grouppes
// @route DELETE /admin/groupes/:id
// @acess Private /admin
const deleteGroupe = asyncHandler(async(req,res) => {
    const group = await Groupes.findById(req.params.id)
    if (group) {
            await group.remove()
            res.json({
                message: 'Groupe Removed ! '
            })
    } else {
        res.status(404)
        throw new Error('Groupe Not Found !')
    }
 })

// @desc Update  groupe
// @route PUT /groupes/:id
// @acess Private /admin
const updateGroupe = asyncHandler(async(req,res) => {

    const group = await Groupes.findById(req.params.id)

    if(group) {
        group.nomGroupe = req.body.nomGroupe || group.nomGroupe

        group.descriptionGroupe = req.body.descriptionGroupe || group.descriptionGroupe

        group.nomMembres = req.body.nomMembres || group.nomMembres

        group.emailMembres = req.body.emailMembres || group.emailMembres


        const updateGroup = await group.save()

        res.json({ 
            _id: updateGroup._id,
            nomGroupe : updateGroup.nomGroupe,
            descriptionGroupe: updateGroup.descriptionGroupe,
            nomMembres: updateGroup.nomMembres,
            emailMembres: updateGroup.emailMembres
        })
    } else {
        res.status(404)
        throw new Error('Group Not Found ! ')
    }
 })

   // @desc GET group by id 
// @route GET /admin/groupes/:id
// @acess Private /admin
const getGroupById = asyncHandler(async(req,res) => {
    const group = await Groupes.findById(req.params.id).select()

    if (group) {
        res.json(group)
    } else {
        res.status(404)
        throw new Error('User Not Found !')  
    }
 })


 export {addGroup, getAllGroups, deleteGroupe, updateGroupe, getGroupById}