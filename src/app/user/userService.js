import {
    createUserAccount,
    createOrganizationUserAccount,
    getUserInfo,
    getOrganizationUserInfo,
    updateUserProfileInfo,
    updateUserPassword,
    updateOrganizationPassword,
  } from './userDao.js';
  import { userIdCheck, organizationIdCheck } from './userProvider.js';
  import { pool } from '../../../config/database.js';
  import {
    ID_ALREADY_EXISTS,
    SUCCESS,
    FAIL,
    LOGIN_FAILURE,
    PASSWORD_WRONG,
    SIGNUP_SUCCESS,
    SERVER_CONNECT_ERROR,
  } from '../../../config/baseResponseStatus.js';
  import jwt from 'jsonwebtoken';
  import { createHash } from 'crypto';
  import dotenv from 'dotenv';
  
  dotenv.config('../../../.env');
  // Create, Update, Delete
  
  export async function createUser(userId, password, userName, phoneNumber, address, type, info) {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const userIdCheckResult = await userIdCheck(userId);
      if (userIdCheckResult.length > 0) return ID_ALREADY_EXISTS; // id가 이미 존재할 경우
  
      const hashedPassword = createHash('sha512').update(password).digest('hex');
      const params = [userId, hashedPassword, userName, phoneNumber, address, type, info];
      const createUserIdResult = await createUserAccount(connection, params);
      console.log(`추가된 일반 사용자 Idx: ${createUserIdResult[0].insertId}, ID: ${userId}`);
      connection.release();
      return SIGNUP_SUCCESS;
    } catch (err) {
      return SERVER_CONNECT_ERROR;
    }
  }
  
  export async function userLogin(userId, password, type) {
    const connection = await pool.getConnection(async conn => conn);
  
    try {
      const userIdCheckResult = await userIdCheck(userId);
      if (userIdCheckResult.length < 1) return LOGIN_FAILURE; // code 1002 아이디가 존재 하지 않을 경우
  
      const hashedPassword = createHash('sha512').update(password).digest('hex');
      const params = [userId, hashedPassword];
      const checkResult = await getUserInfo(connection, params);
  
      if (checkResult.length >= 1) {
        // DB에서 비교후에 id가 존재할 경우
        const accessToken = jwt.sign({ id: userId, userType: type }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: userId, userType: type }, process.env.JWT_SECRET, { expiresIn: '14 days' });
        return {
          isSuccess: true,
          code: 1000,
          message: '성공',
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      } else {
        return PASSWORD_WRONG;
      }
    } catch (err) {
      return SERVER_CONNECT_ERROR;
    } finally {
      connection.release();
    }
  }
  
  export async function changeUserPassword(userId, newPassword) {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const hashedPassword = createHash('sha512').update(newPassword).digest('hex');
      const params = [hashedPassword, userId];
  
      const changePasswordResult = await updateUserPassword(connection, params);
      return SUCCESS;
    } catch (err) {
      return SERVER_CONNECT_ERROR;
    } finally {
      connection.release();
    }
  }
  
  
  export async function updateUserProfile(userName, phoneNumber, address, info, userId) {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const params = [userName, phoneNumber, address, info, userId];
      const updateUserProfileResponse = await updateUserProfileInfo(connection, params);
      // console.log(updateUserProfileResponse.affectedRows);
      // console.log(updateUserProfileResponse.changedRows);
      // changedRows = 0 -> 변경된 내용 없음
      // changedRows = 숫자 -> 변경된 열 수
      return {
        isSuccess: true,
        code: 1000,
        message: '성공',
        data: {
          changedRows: updateUserProfileResponse.changedRows,
        },
      };
    } catch (err) {
      return SERVER_CONNECT_ERROR;
    } finally {
      connection.release();
    }
  }