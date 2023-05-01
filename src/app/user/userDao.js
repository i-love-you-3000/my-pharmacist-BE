module.exports = {
    signUp,
    passwordCheck,
    getId,
  };
  
  // 1. 회원 가입
  async function signUp(connection, param) {
    const Query = `
    INSERT INTO users(id, pw, user_name, sex, breakfast, lunch, dinner, birth) VALUES (?,?,?,?,?,?,?,?);
                        `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
  }
  
  // 2. 비밀번호 확인
  async function passwordCheck(connection, param) {
    const Query = `
      select id, pw from users where id = ? and pw = ?;
                          `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
  }
  
  // 3. id 가져오기
  async function getId(connection, param) {
    const Query = `
        select id from users where id = ?;
                            `;
    const [Rows] = await connection.query(Query, param);
    return Rows;
  }