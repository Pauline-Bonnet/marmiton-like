import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

export const userCreationValidationRules = [
    body('firstname').isString().isLength({max: 50}).withMessage('Prénom max 50 caractères').notEmpty().withMessage('Champ prénom requis'),
    body('lastname').isString().isLength({max: 100}).withMessage('Prénom au max 100 caractères').notEmpty().withMessage('Champ nom requis'),
    body('pseudo').isString().isLength({max: 50}).withMessage('Pseudo max 50 caractères').notEmpty().withMessage('Champ pseudo requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({min: 8}).withMessage('Mot de passe doit faire au moins 8 caractères')
];

export const userUpdateValidationRules = [
    body('firstname').optional().isString().isLength({max: 50}),
    body('lastname').optional().isString().isLength({max: 100}),
    body('pseudo').optional().isString().isLength({max: 50}),
    body('email').optional().isEmail(),
    body('password').optional().isLength({max: 8}),
];

export const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()})
        return;
    }
    
    next();
}