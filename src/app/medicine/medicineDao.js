// 1. 데이터 추가
export async function addMedicine_DAO(connection, param) {
    const Query = "insert into medicine(item_seq, item_name, effect, image) values (?,?,?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 2. 약 번호로 데이터 가져오기
export async function getMedicineByItemSeq_DAO(connection, param) {
    const Query = "select * from medicine where item_seq= ?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 3. 약 번호 가져오기
export async function getMedicineItemSeq_DAO(connection) {
    const Query = "select item_seq from medicine;";
    const [Rows] = await connection.query(Query);
    return Rows;
}
