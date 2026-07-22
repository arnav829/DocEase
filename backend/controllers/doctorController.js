import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import { success } from "zod"

const changeAvailablity = async (req, res) => {
    try {
        
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true, message:'Availablity changed'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}



// api for doctor login

const loginDoctor = async (req, res) => {
    try {

        const {email, password } = req.body
        const doctor = await doctorModel.findOne({email})
        
        if(!doctor){
            return res.json({success: false, message:'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){

            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            res.json({success:true, token})

        } else {
            res.json({success:false, message: 'Invalid Credentials'})
        }



    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


// api to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {

        const {docId} = req
        const appointments = await appointmentModel.find({ docId })

        res.json({success: true, appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


// api to get doctor profie
const doctorProfile = async (req,res) => {
    try {
        const {docId} = req;

        const doctorData = await doctorModel.findById(docId).select("-password")

        res.json({success:true, doctorData})
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false, message:error.message})
    }
}



export {changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, doctorProfile}

