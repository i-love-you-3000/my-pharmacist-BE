import { SUCCESS } from "../../../config/baseResponseStatus.js";
import { insertMethod_Service, deleteMethod_Service, updateMethod_Service, getMethod_Service } from "./methodService.js";
import dotenv from "dotenv";
import request, { del } from "request";
dotenv.config();

export class methodController {
    addMethod_Controller = async function (req, res) {
        const id = req.body.id;
        const itemSeq = req.body.itemSeq;
        const breakfast = req.body.breakfast;
        const lunch = req.body.lunch;
        const dinner = req.body.dinner;
        const baw = req.body.baw;
        const intakePeriod = req.body.intakePeriod;
        const expPeriod = req.body.expPeriod;

        const addResponse = await insertMethod_Service(id, itemSeq, breakfast, lunch, dinner, baw, intakePeriod, expPeriod);
        return res.send(addResponse);
    };

    getMethod_Controller = async function (req, res) {
        const id = req.body.id;
        const itemSeq = req.body.itemSeq;

        const response = await getMethod_Service(id, itemSeq);
        return res.send(response);
    };

    deleteMethod_Controller = async function (req, res) {
        const className = req.body.className;

        const response = await deleteMethod_Service(className);
        return res.send(response);
    };

    updateMethod_Controller = async function (req, res) {
        const id = req.body.id;
        const itemSeq = req.body.itemSeq;
        const expPeriod = req.body.expPeriod;

        const response = await updateMethod_Service(id, itemSeq, expPeriod);
        return res.send(response);
    };
}
export default new methodController();
