export const SUCCESS = { isSuccess: true, code: 1000, message: '성공' };
export const FAIL = { isSuccess: false, code: 1001, message: '실패' };

export const LOGIN_FAILURE = { isSuccess: false, code: 1002, message: '아이디가 존재하지 않습니다.' };
export const LOGIN_ERROR = { isSuccess: false, code: 1003, message: '이용하려면 로그인 하세요' };

export const PASSWORD_EMPTY = { isSuccess: false, code: 2001, message: '비밀번호를 입력하세요.' };
export const PASSWORD_WRONG = { isSuccess: false, code: 2002, message: '비밀번호가 맞지 않습니다.' };
export const SIGNUP_VERIFIEDPASSWORD_EMPTY = { isSuccess: false, code: 2003, message: '비밀번호 확인을 입력하세요.' };
export const SIGNUP_NAME_EMPTY = { isSuccess: false, code: 2004, message: '이름을 입력하세요.' };
export const UPDATE_ERROR_TYPE = { isSuccess: false, code: 2005, message: '잘못된 형식 입니다.' };
export const ID_ALREADY_EXISTS = { isSuccess: false, code: 2006, message: '이미 존재하는 아이디 입니다.' };
export const ID_EMPTY = { isSuccess: false, code: 2007, message: '아이디를 입력하세요' };
export const BIRTH_EMPTY = { isSuccess: false, code: 2008, message: '생년월일을 입력하세요' };;
export const SEX_EMPTY = { isSuccess: false, code: 2009, message: '성별을 입력하세요' };
export const MEAL_EMPTY= { isSuccess: false, code: 2010, message: '식사시간을 입력하세요' };

export const ID_LENGTH_ERROR = { isSuccess: false, code: 2010, message: '아이디 길이를 확인하세요. ' };
export const PASSWORD_LENGTH_ERROR = { isSuccess: false, code: 2011, message: '비밀번호 길이를 확인하세요. ' };

export const SIGNUP_SUCCESS = { isSuccess: true, code: 2012, message: '회원가입에 성공하였습니다. ' };
export const SIGNUP_FAIL = { isSuccess: false, code: 2013, message: '회원가입에 실패하였습니다. ' };
// 서버 접속 에러
export const SERVER_CONNECT_ERROR = { isSuccess: false, code: 4000, message: '서버 접속 에러입니다.' };

// JWT 미들웨어 에러
export const TOKEN_VERIFICATION_SUCCESS = { isSuccess: true, code: 5000, message: 'JWT 토큰 검증 성공' };
export const TOKEN_EMPTY = { isSuccess: false, code: 5001, message: 'JWT 토큰을 입력해 주세요.' };
export const TOKEN_VERIFICATION_FAILURE = { isSuccess: false, code: 5002, message: 'JWT 토큰 검증 실패' };
export const TOKEN_EXPIRED = { isSuccess: false, code: 5003, message: 'JWT 토큰 만료, 다시 로그인 해주세요. ' };
export const TOKEN_IS_VALID = { isSuccess: true, code: 5004, message: '모든 토큰이 유효 합니다. ' };