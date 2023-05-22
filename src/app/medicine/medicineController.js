import { addMedicine_Service, getMedicineByItemSeq_Service, getMedicineByClass_Service } from "./medicineService.js";
import { SUCCESS } from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";
import request from "request";
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
        const response = await getMedicineByClass_Service(className);
        return res.send(response);
    };

    getMedicineByItemSeq_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;
        const response = await getMedicineByItemSeq_Service(itemSeq);
        return res.send(response);
    };

    findSideEffect = async function (req, res) {
        const itemSeq = req.query.keyword;
        console.log(itemSeq);

        var url = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
        var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
        queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
        queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("3"); /* */
        queryParams += "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent(itemSeq); /* */
        queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /* */
        console.log("hello");
        request(
            {
                url: url + queryParams,
                method: "GET",
            },
            function (error, response, body) {
                console.log("Status", response.statusCode);
                console.log("Headers", JSON.stringify(response.headers));
                console.log("Response received", body);
                return res.send(body);
            }
        );
    };
}
export default new medicineController();
