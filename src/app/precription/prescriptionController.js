import {
    insertPrescription_Service,
    updatePrescription_Service,
    getPrescription_Service,
    deleteMedicineInPSPT_Service,
    deletePrescription_Service,
} from "./prescriptionService.js";
import { SERVER_CONNECT_ERROR } from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";

export class prescriptionController {
    insertPrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;

        const newPSPT = await insertPrescription_Service(id, item_seq);
        return res.send(newPSPT);
    };

    updatePrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const new_item_seq = req.body.new_item_seq;
        const item_seq = req.body.item_seq;

        const prescriptionResponse = await updatePrescription_Service(id, new_item_seq, item_seq);
        return res.send(prescriptionResponse);
    };

    getPrescription_Controller = async function (req, res) {
        const id = rq.body;
        const prescriptionResponse = await getPrescription_Service(id);
        return res.send(prescriptionResponse);
    };

    deleteMedicineInPSPT_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;

        const prescriptionResponse = await deleteMedicineInPSPT_Service(id, item_seq);
        return res.send(prescriptionResponse);
    };

    deletePrescription_Controller = async function (req, res) {
        const id = req.body.id;

        const prescriptionResponse = await deletePrescription_Service(id);
        return res.send(prescriptionResponse);
    };
}

export default new prescriptionController();
