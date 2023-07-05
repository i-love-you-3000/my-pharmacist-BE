import {
    insertPrescription_Service,
    updatePrescription_Service,
    getPrescription_Service,
    deleteMedicineInPSPT_Service,
    deletePrescription_Service,
} from "./prescriptionService.js";
import { ID_EMPTY, ITEM_SEQ_EMPTY, NEW_ITEM_SEQ_EMPTY } from "../../../config/baseResponseStatus.js";

export class prescriptionController {
    insertPrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;
        const register_date = req.body.item_seq;
        const breakfast = req.body.breakfast;
        const lunch = req.body.lunch;
        const dinner = req.body.dinner;
        const baw = req.body.baw;
        const intakePeriod = req.body.intakePeriod;
        const expPeriod = req.body.expPeriod;

        if (!id) return res.send(ID_EMPTY);
        if (!item_seq) return res.send(ITEM_SEQ_EMPTY);

        const newPSPT = await insertPrescription_Service(
            id,
            item_seq,
            register_date,
            breakfast,
            lunch,
            dinner,
            baw,
            intakePeriod,
            expPeriod
        );
        return res.send(newPSPT);
    };

    updatePrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;
        const register_date = req.body.item_seq;
        const breakfast = req.body.breakfast;
        const lunch = req.body.lunch;
        const dinner = req.body.dinner;
        const baw = req.body.baw;
        const intakePeriod = req.body.intakePeriod;
        const expPeriod = req.body.expPeriod;

        if (!id) return res.send(ID_EMPTY);
        if (!item_seq) return res.send(ITEM_SEQ_EMPTY);

        //prettier-ignore
        const prescriptionResponse = await updatePrescription_Service(id, item_seq, register_date, breakfast, lunch, dinner, baw, intakePeriod, expPeriod);
        return res.send(prescriptionResponse);
    };

    getPrescription_Controller = async function (req, res) {
        const id = req.query.id;
        const prescriptionResponse = await getPrescription_Service(id);
        return res.send(prescriptionResponse);
    };

    deleteMedicineInPSPT_Controller = async function (req, res) {
        const id = req.body.id;
        const item_seq = req.body.item_seq;
        const register_date = req.body.register_date;

        if (!id) return res.send(ID_EMPTY);
        if (!item_seq) return res.send(ITEM_SEQ_EMPTY);

        const prescriptionResponse = await deleteMedicineInPSPT_Service(id, item_seq, register_date);
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
