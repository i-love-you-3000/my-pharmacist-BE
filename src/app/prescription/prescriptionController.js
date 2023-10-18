import {
    insertPrescription_Service,
    updatePrescription_Service,
    getPrescription_Service,
    getPrescriptionDetail_Service,
    deleteMedicineInPSPT_Service,
    deletePrescription_Service,
} from "./prescriptionService.js";
import { FAIL, ID_EMPTY, ITEM_SEQ_EMPTY, NEW_ITEM_SEQ_EMPTY } from "../../../config/baseResponseStatus.js";
import { getCombProhibit_Service } from "../combProhibit/combProhibitService.js";
import { isPlainObject } from "is-plain-object";
import util from "util";
import camelCase from "camelcase";
import isObject from "isobject";
import isArray from "isarray";

const camelize = (obj) =>
    transform(obj, (acc, value, key, target) => {
        const camelKey = isArray(target) ? key : camelCase(key);

        acc[camelKey] = isObject(value) ? camelize(value) : value;
    });

async function keysToCamel(obj) {
    if (isPlainObject(obj)) {
        const n = {};
        Object.keys(obj).forEach(async (k) => (n[camelCase(k)] = await keysToCamel(obj[k])));
        return n;
    } else if (isArray(obj)) obj.map(async (i) => await keysToCamel(i));
    return obj;
}

async function checkCP(id, itemSeq) {
    const prescriptionList = await getPrescription_Service(id);

    if (prescriptionList.length == 0) return true;
    prescriptionList.forEach(async function (element) {
        if (element.itemSeq == itemSeq) return false;
        const cpList = await getCombProhibit_Service(element.itemSeq, itemSeq);
        if (cpList.length != 0) return false;
    });
    return true;
}
export class prescriptionController {
    insertPrescription_Controller = async function (req, res) {
        console.log(req.body);
        const id = req.body.id;
        const itemSeq = req.body.itemSeq;
        const registerDate = req.body.registerDate;
        const breakfast = req.body.breakfast == "true" ? true : false;
        const lunch = req.body.lunch == "true" ? true : false;
        const dinner = req.body.dinner == "true" ? true : false;
        const baw = req.body.baw;
        const intakePeriod = parseInt(req.body.intakePeriod);
        const expPeriod = req.body.expPeriod;

        if (!id) return res.send(ID_EMPTY);
        if (!itemSeq) return res.send(ITEM_SEQ_EMPTY);

        if (!checkCP(id, itemSeq)) return res.send(FAIL);
        const newPSPT = await insertPrescription_Service(
            id,
            itemSeq,
            registerDate,
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
        const itemSeq = req.body.itemSeq;
        const registerDate = req.body.registerDate;
        const breakfast = req.body.breakfast;
        const lunch = req.body.lunch;
        const dinner = req.body.dinner;
        const baw = req.body.baw;
        const intakePeriod = req.body.intakePeriod;
        const expPeriod = req.body.expPeriod;

        if (!id) return res.send(ID_EMPTY);
        if (!itemSeq) return res.send(ITEM_SEQ_EMPTY);

        //prettier-ignore
        const prescriptionResponse = await updatePrescription_Service(id, itemSeq, registerDate, breakfast, lunch, dinner, baw, intakePeriod, expPeriod);
        return res.send(prescriptionResponse);
    };

    getPrescription_Controller = async function (req, res) {
        const id = req.query.id;
        const prescriptionResponse = await getPrescription_Service(id);
        var responseList = [];
        for (var i = 0; i < prescriptionResponse.length; i++) {
            responseList.push(await keysToCamel(prescriptionResponse[i]));
        }
        // prescriptionResponse.forEach(async function (obj) {
        //     console.log(obj);
        //     await responseList.push(await keysToCamel(obj));
        // });

        console.log(responseList);
        return await res.send(responseList);
    };

    getPrescriptionDetail_Controller = async function (req, res) {
        const id = req.query.id;
        const itemSeq = req.query.itemSeq;
        const registerDate = req.query.registerDate;

        const prescriptionResponse = await getPrescriptionDetail_Service(id, itemSeq, registerDate);
        var responseList = [];

        for (var i = 0; i < prescriptionResponse.length; i++) {
            responseList.push(await keysToCamel(prescriptionResponse[i]));
        }
        console.log(responseList);
        return res.send(responseList);
    };

    deleteMedicineInPSPT_Controller = async function (req, res) {
        const id = req.body.id;
        const itemSeq = req.body.itemSeq;
        const registerDate = req.body.registerDate;

        console.log(id);
        //if (!id) return res.send(ID_EMPTY);
        //if (!itemSeq) return res.send(ITEM_SEQ_EMPTY);

        const prescriptionResponse = await deleteMedicineInPSPT_Service(id, itemSeq, registerDate);
        return res.send(prescriptionResponse);
    };

    deletePrescription_Controller = async function (req, res) {
        const id = req.body.id;
        const register_date = req.body.registerDate;

        console.log(req.body);
        //if (!id) return res.send(ID_EMPTY);

        const prescriptionResponse = await deletePrescription_Service(id, register_date);
        return res.send(prescriptionResponse);
    };
}

export default new prescriptionController();
