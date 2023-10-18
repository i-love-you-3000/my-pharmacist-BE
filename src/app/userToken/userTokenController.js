import { insertUserToken_Service, getUserToken_Service, deleteUserToken_Service } from "./userTokenService";
import { FAIL, ID_EMPTY, ITEM_SEQ_EMPTY, NEW_ITEM_SEQ_EMPTY } from "../../../config/baseResponseStatus.js";
import { createHash } from "crypto";

export class userTokenController {
    insertUserToken_Controller = async function (req, res) {
        const id = req.body.id;

        const userTokenResult = await insertUserToken_Service(id);
        return userTokenResult;
    };

    getUserToken_Controller = async function (req, res) {
        const id = req.body.id;

        const userTokenResult = await getUserToken_Service(id);
        return userTokenResult;
    };

    deleteUserToken_Controller = async function (req, res) {
        const user_token = req.body.userToken;

        const userTokenResult = await deleteUserToken_Service(user_token);
        return userTokenResult;
    };
}
