import { NextFunction } from "express";

const expressWinston = require('express-winston');
const { format, transports } = require('winston');

export default () => {
    return (req: any, res: any, next: NextFunction) => {
    expressWinston.logger({
        format: format.combine(
            format.colorize(),
            format.json(),
        ),
        transports: [
            new transports.Console(),
        ],
    });
    next();
    }
}

