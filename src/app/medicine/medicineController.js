import { addMedicine_Service, getMedicineByItemSeq_Service, getMedicineItemSeq_Service } from "./medicineService.js";
import { SUCCESS } from "../../../config/baseResponseStatus.js";
import dotenv from "dotenv";
import request from "request";
dotenv.config();

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
export class medicineController {
    addMedicine_Controller = async function (req, res) {
        const itemSeq = req.body.itemSeq;
        const itemName = req.body.itemName;
        const effect = req.body.effect;
        const image = req.body.image;

        const addResponse = await addMedicine_Service(itemSeq, itemName, effect, image);
        return res.send(addResponse);
    };

    getMedicineItemSeq_Controller = async function (req, res) {
        const response = await getMedicineItemSeq_Service();
        return res.send(response);
    };

    getMedicineByItemSeq_Controller = async function (req, res) {
        const itemSeq = req.query.itemSeq;
        console.log(itemSeq);
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
                console.log("Response received", JSON.parse(body).body);

                return res.send(body);
            }
        );
    };

    loadMedicineData = async function (req, res) {
        var url = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";

        for (var i = 1; i <= 45; i++) {
            var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
            queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(i.toString()); /* */
            queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); /* */
            queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /* */

            request(
                {
                    url: url + queryParams,
                    method: "GET",
                },
                function (error, response, body) {
                    //console.log('Status', response.statusCode);
                    //console.log('Headers', JSON.stringify(response.headers));
                    const parsedJson = JSON.parse(body);
                    const item = parsedJson.body.items;
                    item.forEach(async (it) => {
                        const itemSeq = it.itemSeq;
                        const itemName = it.itemName;
                        const image = it.itemImage;
                        const effect = it.efcyQesitm;

                        const response = await addMedicine_Service(itemSeq, itemName, effect, image);
                        //console.log(response);
                        sleep(2000);
                    });
                }
            );
        }

        url = "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01";

        for (var i = 1; i <= 1; i++) {
            var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
            queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(i.toString()); /* */
            queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /* */
            queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /* */

            request(
                {
                    url: url + queryParams,
                    method: "GET",
                },
                function (error, response, body) {
                    //console.log('Status', response.statusCode);
                    //console.log('Headers', JSON.stringify(response.headers));
                    console.log(body);
                    const parsedJson = JSON.parse(body);
                    const item = parsedJson.body.items;
                    item.forEach(async (it) => {
                        const itemSeq = it.ITEM_SEQ;
                        const itemName = it.ITEM_NAME;
                        const image = it.ITEM_IMAGE;
                        const effect = " ";

                        const response = await addMedicine_Service(itemSeq, itemName, effect, image);
                        console.log(response);
                        sleep(2000);
                    });
                }
            );
        }
    };
}
export default new medicineController();
