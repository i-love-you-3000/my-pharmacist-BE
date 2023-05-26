// 1. 데이터 추가
export async function insertMethod_DAO(connection, param) {
    const Query =
        "insert into method(id, item_seq, breakfast, lunch, dinner, baw, intake_period, exp_period) values (?,?,?,?,?,?,?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 2. 데이터 가져오기
export async function getMethod_DAO(connection, param) {
    const Query = "select * from method where id=? and item_seq= ?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 3. 복용 방식 변경
export async function updateMethod_DAO(connection, param) {
    const Query = "update breakfast = ? and lunch =? and dinner =? and baw = ? where id = ? and item_seq= ?";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 4. 데이터 삭제
export async function deleteMethod_DAO(connection, param) {
    const Query = "delete from method where id = ? and item_seq =? and exp_period=?  ";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}
