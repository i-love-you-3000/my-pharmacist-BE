import { SUCCESS } from "../../../config/baseResponseStatus.js";
import { getMedicineItemSeq_Service } from "../medicine/medicineService.js";
import {
    getCombProhibitByItemSeq_Service,
    insertCombProhibit_Service,
    deleteCombProhibit_Service,
    getCombProhibit_Service,
} from "./combProhibitService.js";
import request from "request";

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

    loadSideEffect = async function (req, res) {
        const list = await getMedicineItemSeq_Service();
        var url = "http://apis.data.go.kr/1471000/DURPrdlstInfoService02/getUsjntTabooInfoList02";
        var totalCount;

        list.forEach(async function (itemSeq) {
            var tmp = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
            tmp += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
            tmp += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /* */
            tmp += "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent("202002585"); /* */
            tmp += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /* */

            request(
                {
                    url: url + tmp,
                    method: "GET",
                },
                function (error, response, body) {
                    //console.log('Status', response.statusCode);
                    //console.log('Headers', JSON.stringify(response.headers));
                    //console.log(url);
                    //console.log(body);
                    const parsedJson = JSON.parse(body);
                    totalCount = parsedJson.body.totalCount;
                    console.log(totalCount);
                }
            );

            if (totalCount > 100) {
                for (var i = 1; i <= totalCount / 100 + 1; i++) {
                    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
                    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(i.toString()); /* */
                    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /* */
                    queryParams += "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent(itemSeq.toString()); /* */
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
                            console.log(item);
                            // item.forEach(async (it) => {
                            //     // const itemSeq = it.ITEM_SEQ;
                            //     // const ingrName = it.INGR_KOR_NAME;
                            //     // const mixtureItemSeq = it.MIXTURE_ITEM_SEQ;
                            //     // const mixtureIngr = it.MIXTURE_INGR;
                            //     // const prohibitContent = it.PROHBT_CONTENT;

                            //     // const response = await addMedicine_Service(itemSeq, itemName, effect, image);
                            //     // console.log(response);
                            //     insertCombProhibit_Controller(it, res);
                            // });
                        }
                    );

                    // function sleep(t) {
                    //     return new Promise((resolve) => setTimeout(resolve, t));
                    // }
                    // await sleep(3000);
                }
            } else {
                var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
                queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
                queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); /* */
                queryParams += "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent("202002585"); /* */
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
                        console.log(item);
                        // item.forEach(async (it) => {
                        //     // const itemSeq = it.ITEM_SEQ;
                        //     // const ingrName = it.INGR_KOR_NAME;
                        //     // const mixtureItemSeq = it.MIXTURE_ITEM_SEQ;
                        //     // const mixtureIngr = it.MIXTURE_INGR;
                        //     // const prohibitContent = it.PROHBT_CONTENT;

                        //     // const response = await addMedicine_Service(itemSeq, itemName, effect, image);
                        //     // console.log(response);
                        //     insertCombProhibit_Controller(it, res);
                        // });
                    }
                );
            }
        });
    };
}
export default new combProhibitController();
