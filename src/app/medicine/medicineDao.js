// 1. 데이터 추가
export async function addMedicine_DAO(connection, param) {
    const Query = "insert into medicine(item_seq, item_name, class_name, dur_seq, chart, effect, image) values (?,?,?,?,?,?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 2. 약 번호로 데이터 가져오기
export async function getMedicineByItemSeq_DAO(connection, param) {
    const Query = "select * from medicine where item_seq= ?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 3. 약 모양으로 데이터 가져오기
export async function getMedicineByClass_DAO(connection, param) {
    const Query = "select * from medicine where class_name= ?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}
