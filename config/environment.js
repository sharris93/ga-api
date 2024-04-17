import dotenv from 'dotenv';
dotenv.config();

export const dbURI = process.env.DB_URI || 'mongodb://localhost/dough-db';
export const port = process.env.PORT || 4000;
export const secret = process.env.SECRET || 'alaraandchloelovecarbs';
