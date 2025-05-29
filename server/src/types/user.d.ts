import { RowDataPacket } from "mysql2";

// User représente la structure complète des données utilisateur qu'on attend lors d'un fetch
export interface User extends RowDataPacket { 
  user_id: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
}

// NewUserInput représente la structure des données utilisateur qu'on attend lors de la création (pour ça qu'on a le password et que le role est mis en optionnel --> pour gérer le cas où un admin créerait un user avec un rôle, mais par défaut on aura user)
export interface NewUserInput {
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  password: string;
  role?: 'admin' | 'user'; 
}

// création d'un type à partir de NewUserInput :comme ça, lors de la mise à jour on l'utilisera et on pourra mettre à jour aussi le password (alors qu'on n'aurait pas pu avec User) --> avec Partial, tous les champs sont rendus optionnels, donc on pourra faire des mises à jour ... partielles =P
export type UserUpdateInput = Partial<NewUserInput>;