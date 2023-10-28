import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TOKEN_VERIFICATION_FAILURE } from "./baseResponseStatus.js";
dotenv.config();
class jwtAuthorization {
    sign = (user) => {
        const payload = {
            // accessToken 에 들어갈 payload
            id: user.id,
            distinction: user.distinction,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "60m",
        });
    };

    verify = (accessToken) => {
        // access token 검증
        const tokenData = jwt.verify(accessToken, process.env.JWT_SECRET, (err, data) => {
            if (err)
                return {
                    isSuccess: false,
                    code: 5002,
                    token: "AccessToken",
                    name: err.name,
                    message: err.message,
                };
            return {
                isSuccess: true,
                id: data.id,
                distinction: data.distinction,
            };
        });
        return tokenData;
    };

    refresh = (user) => {
        const payload = {
            id: user.id,
            distinction: user.distinction,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "14 days",
        });
    };

    refreshVerify = (refreshToken, userId) => {
        try {
            const tokenData = jwt.verify(refreshToken, process.env.JWT_SECRET, (err, data) => {
                if (err)
                    return {
                        isSuccess: false,
                        code: 5003,
                        token: "RefreshToken",
                        name: err.name,
                        message: err.message,
                    };

                if (data.id === userId.id && data.distinction === userId.distinction) {
                    return {
                        isSuccess: true,
                        id: data.id,
                        distinction: data.distinction,
                    };
                }
                return {
                    isSuccess: false,
                    code: 5004,
                    message: "RefreshToken Decoded 값 불일치",
                    id: data.id,
                    distinction: data.distinction,
                };
            });

            return tokenData;
        } catch (err) {
            return {
                isSuccess: false,
                name: err.name,
                message: err.message,
            };
        }
    };
}
export default new jwtAuthorization();
