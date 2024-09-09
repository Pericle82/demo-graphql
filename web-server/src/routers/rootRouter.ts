import express, { Router } from "express";
import shortCircuitRouter from "./shortCircuitRouter";

export default (static_root_path: string): Router => {
    const router = express.Router();

    router
        .use('/api', shortCircuitRouter())
        .use('/', express.static('public'));

    return router;

}
