import { insertUserToken_Service, getUserToken_Service, deleteUserToken_Service } from "./userTokenService";
import { FAIL, ID_EMPTY, ITEM_SEQ_EMPTY, NEW_ITEM_SEQ_EMPTY } from "../../../config/baseResponseStatus.js";
import { createHash } from "crypto";

export class userTokenController {
    insertUserToken_Controller = async function (req, res) {
        const id = req.body.id;

        req.session.user = {
            id: id,
            authorized: true,
        };

        const userTokenResult = await insertUserToken_Service(id);
        return userTokenResult;
    };
}
