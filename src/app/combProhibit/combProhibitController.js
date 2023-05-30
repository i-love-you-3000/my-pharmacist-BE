import { SUCCESS } from "../../../config/baseResponseStatus.js";
import {
    getCombProhibitByItemSeq_Service,
    insertCombProhibit_Service,
    deleteCombProhibit_Service,
    getCombProhibit_Service,
} from "./combProhibitService.js";
import dotenv from "dotenv";
dotenv.config();

export class combProhibitController {
    insertCombProhibit_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;
        const ingrName = req.body.ingrName;
        const mixtureItemSeq = req.body.mixtureItemSeq;
        const mixtureIngr = req.body.mixtureIngr;
        const prohibitContent = req.body.prohibitContent;

        const response = await insertCombProhibit_Service(itemSeq, ingrName, mixtureItemSeq, mixtureIngr, prohibitContent);
        return res.send(response);
    };

    getCombProhibit_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;
        const mixtureItemSeq = req.body.mixtureItemSeq;

        const response = await getCombProhibit_Service(itemSeq, mixtureItemSeq);
        return res.send(response);
    };

    getCombProhibitByItemSeq_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;

        const response = await getCombProhibitByItemSeq_Service(itemSeq);
        return res.send(response);
    };

    deleteCombProhibit_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;
        const mixtureItemSeq = req.body.mixtureItemSeq;

        const response = await deleteCombProhibit_Service(itemSeq, mixtureItemSeq);
        return res.send(response);
    };
}
export default new combProhibitController();
