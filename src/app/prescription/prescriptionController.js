import {
    insertPrescription_Service,
    updatePrescription_Service,
    getPrescription_Service,
    deleteMedicineInPSPT_Service,
    deletePrescription_Service,
} from "./prescriptionService.js";
import { ID_EMPTY, ITEM_SEQ_EMPTY, NEW_ITEM_SEQ_EMPTY } from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";

dotenv.config();

export class prescriptionController {
    insertPrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;

        if (!id) return res.send(ID_EMPTY);
        if (!item_seq) return res.send(ITEM_SEQ_EMPTY);

        const newPSPT = await insertPrescription_Service(id, item_seq);
        return res.send(newPSPT);
    };

    updatePrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const new_item_seq = req.body.new_item_seq;
        const item_seq = req.body.item_seq;

        if (!id) return res.send(ID_EMPTY);
        if (!item_seq) return res.send(ITEM_SEQ_EMPTY);
        if (!new_item_seq) return res.send(NEW_ITEM_SEQ_EMPTY);

        const prescriptionResponse = await updatePrescription_Service(id, new_item_seq, item_seq);
        return res.send(prescriptionResponse);
    };

    getPrescription_Controller = async function (req, res) {
        const id = req.body;
        const prescriptionResponse = await getPrescription_Service(id);
        return res.send(prescriptionResponse);
    };

    deleteMedicineInPSPT_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;

        if (!id) return res.send(ID_EMPTY);
        if (!item_seq) return res.send(ITEM_SEQ_EMPTY);

        const prescriptionResponse = await deleteMedicineInPSPT_Service(id, item_seq);
        return res.send(prescriptionResponse);
    };

    deletePrescription_Controller = async function (req, res) {
        const id = req.body.id;

        if (!id) return res.send(ID_EMPTY);

        const prescriptionResponse = await deletePrescription_Service(id);
        return res.send(prescriptionResponse);
    };
}

export default new prescriptionController();
