// 1. 회원 가입
export async function createUser_DAO(connection, param) {
    const Query = `
    INSERT INTO users(id, pw, username, sex, breakfast, lunch, dinner, birth) VALUES (?,?,?,?,?,?,?,?);
                        `;
    try {
        const data = await connection.query(Query, param);
        // 성공적으로 쿼리 실행
    } catch (error) {
        console.error("쿼리 실행 중 오류 발생:", error);
        // 오류 처리 또는 기타 조치 수행
    }
    console.log(data);
    return data;
}

// 2. 비밀번호 확인
export async function passwordCheck(connection, param) {
    const Query = `
      select id, pw from users where id = ? and pw = ?;
                          `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 3. id 가져오기
export async function getId(connection, param) {
    const Query = `
        select id from users where id = ?;
                            `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 4. id 찾기
export async function findId(connection, param) {
    const Query = `
        select id from users where username = ? and birth = ?;
    `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 5. pw 찾기
export async function findPw(connection, param) {
    const Query = `
        select pw from users where user_name = ? and id = ?;
    `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 6. 사용자 정보 변경
export async function updateUserInfo_DAO(connection, originParam, updateParam) {
    const Query = `
        update users set id = ? and pw = ? and user_name = ? and breakfast = ? and lunch = ? and dinner = ? and sex = ? 
        where id = ? and pw = ?;
    `;
    const [Rows] = await connection.query(Query, originParam, updateParam);
    return Rows;
}

// 7. 사용자 보유 약 리스트
export async function getMedicineList_DAO(connection, param) {
    const Query = `
        select item_seq from prescription where id = ?;
    `;

    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 8. 사용자 정보 가져오기
export async function getUserInfo_DAO(connection, param) {
    const Query = `
        select * from users where id = ?;
    `;

    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 9. 비밀번호 변경
export async function updatePassword_DAO(connection, param) {
    const Query = `
        update users set pw = ? where from prescription where id = ?;
    `;

    const [Rows] = await connection.query(Query, param);
    return Rows;
}
