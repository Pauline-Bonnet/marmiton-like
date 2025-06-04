import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

export const userCreationValidationRules = [
    body('firstname').isString().isLength({min:1, max: 50}).withMessage('Prénom max 50 caractères').notEmpty().withMessage('Champ prénom requis'),
    body('lastname').isString().isLength({min:1, max: 100}).withMessage('Prénom au max 100 caractères').notEmpty().withMessage('Champ nom requis'),
    body('pseudo').isString().isLength({min:1, max: 50}).withMessage('Pseudo max 50 caractères').notEmpty().withMessage('Champ pseudo requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password')
    .isLength({min: 8}).withMessage('Mot de passe doit faire au moins 8 caractères')
    .matches(/^(?=.*[a-z])/).withMessage('Mot de passe doit contenir au moins une minuscule')
    .matches(/^(?=.*[A-Z])/).withMessage('Mot de passe doit contenir au moins une majuscule')
    .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])/).withMessage('Mot de passe doit contenir au moins un caractère spécial')
];

export const userUpdateValidationRules = [
  body('firstname')
    .if(body('firstname').exists())
    .notEmpty().withMessage("Le prénom ne peut pas être vide")
    .isLength({ max: 50 }).withMessage("Le prénom ne peut pas dépasser 50 caractères"),

  body('lastname')
    .if(body('lastname').exists())
    .notEmpty().withMessage("Le nom ne peut pas être vide")
    .isLength({ max: 100 }).withMessage("Le nom ne peut pas dépasser 100 caractères"),

  body('pseudo')
    .if(body('pseudo').exists())
    .notEmpty().withMessage("Le pseudo ne peut pas être vide")
    .isLength({ max: 50 }).withMessage("Le pseudo ne peut pas dépasser 50 caractères"),

  body('email')
    .if(body('email').exists())
    .notEmpty().withMessage("L'email ne peut pas être vide")
    .isEmail().withMessage("Email invalide"),

  body('password')
    .if(body('password').exists())
    .notEmpty().withMessage("Le mot de passe ne peut pas être vide")
    .isLength({ min: 8 }).withMessage("Le mot de passe doit faire au moins 8 caractères"),
];


export const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    console.log("🔍 Validation errors:", errors.array());
    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()})
        return;
    }
    
    next();
}