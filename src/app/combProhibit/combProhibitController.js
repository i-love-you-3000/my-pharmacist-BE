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

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
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
        var totalCount = 0;

        var medicine_list = await getMedicineItemSeq_Service();

        for (var i = 0; i < medicine_list.length; i++) {
            console.log(" " + i + " :" + medicine_list[i].item_seq);

            var tmp = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
            tmp += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
            tmp += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /* */
            tmp += "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent(medicine_list[i].item_seq.toString()); /* */
            tmp += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /* */

            await request(
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
                    totalCount = parsedJson.body.totalCount.toString();
                    console.log(parsedJson.body.totalCount.toString());
                }
            );
            if (i == 10) break;
            console.log(totalCount);
            if (parseInt(totalCount) > 100) {
                console.log("NOPE");
                for (var i = 1; i <= totalCount / 100 + 1; i++) {
                    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
                    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent(i.toString()); /* */
                    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); /* */
                    queryParams +=
                        "&" +
                        encodeURIComponent("itemSeq") +
                        "=" +
                        encodeURIComponent(medicine_list[i].item_seq.toString()); /* */
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
                            console.log(response);
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
            } else if (parseInt(totalCount) == 0) {
                console.log("Skipped");
                continue;
            } else {
                console.log("here!");
                var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + process.env.API_KEY; /* Service Key*/
                queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
                queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); /* */
                queryParams +=
                    "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent(medicine_list[i].item_seq.toString()); /* */
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
                        console.log(body);
                        item.forEach(async (it) => {
                            const itemSeq = it.ITEM_SEQ;
                            const ingrName = it.INGR_KOR_NAME;
                            const mixtureItemSeq = it.MIXTURE_ITEM_SEQ;
                            const mixtureIngr = it.MIXTURE_INGR;
                            const prohibitContent = it.PROHBT_CONTENT;

                            const response = await insertCombProhibit_Service(
                                itemSeq,
                                ingrName,
                                mixtureItemSeq,
                                mixtureIngr,
                                prohibitContent
                            );
                            console.log(response);
                            //insertCombProhibit_Controller(it, res);
                            sleep(1000);
                        });
                    }
                );
            }
            sleep(10000);
        }
    };
}
export default new combProhibitController();
