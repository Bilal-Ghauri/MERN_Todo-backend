import { Request , Response , NextFunction } from "express"
import {  IUserId  } from '../types/types'

const jwt = require('jsonwebtoken')

module.exports = function(req : IUserId , res : Response ,next : NextFunction){
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({msg : "Authorization denied , missing token"})
    }

    try {
        let decoded = jwt.verify(token.split(' ')[1] , process.env.JWT_AUTH)
        req.user  = decoded.user
        next()

    } catch (error : any) {
        return res.status(500).json({msg : error.message})
    }
}