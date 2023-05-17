import { addMedicine_Service, getMedicineByItemSeq, getMedicineByClass } from "./medicineService";
import { SUCCESS } from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";
dotenv.config();

export class medicineController {
    addMedicine_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;
        const itemName = req.body.itemName;
        const className = req.body.className;
        const chart = req.body.chart;
        const durSeq = req.body.durSeq;
        const effect = req.body.effect;
        const image = req.body.image;

        const addResponse = await addMedicine_Service(itemSeq, itemName, className, durSeq, chart, effect, image);
        return res.send(addResponse);
    };

    getMedicineByClass_Controller = async function (req, res) {
        const className = req.body.className;
        const response = await getMedicineByClass(className);
        return res.send(response);
    };
}
