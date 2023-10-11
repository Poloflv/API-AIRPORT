import express from "express";
import { changePassword, login, register, deleteAccount } from "./auth.controller.js";
import { protect, protectAccountOwner, retricTo, validExistUser } from "./auth.middleware.js";

export const router = express.Router();

router.post('/login', login)

router.post('/register',protect, retricTo('developer', 'admin'), register)

router.patch('/change-password',protect, changePassword)

router.delete('/:id',protect,validExistUser,protectAccountOwner, deleteAccount)



//1. SIEMPRE QUE VOY A USAR EL restricTo() antes debo usar el protect

//2. siempre que vaya a usar el protectAccountOnwer debo ejecutar el portect