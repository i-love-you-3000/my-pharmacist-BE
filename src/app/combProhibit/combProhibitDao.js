// 1. 데이터 삽입
export async function insertCombProhibit_DAO(connection, param) {
    const Query =
        "insert into comb_prohibit(item_seq, ingr_name, mixture_item_seq, mixture_ingr, prohibit_content) values(?,?,?,?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 2. 데이터 삭제
export async function deleteCombProhibit_DAO(connection, param) {
    const Query = "delete from comb_prohibit where itme_seq = ? and mixture_item_seq = ?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 3. 데이터 찾기(전체)
export async function getCombProhibit_DAO(connection, param) {
    const Query = "select * from comb_prohibit where item_seq =? and mixture_item_seq = ?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

// 4. 약 번호로 데이터 찾기
export async function getCombProhibitByItemSeq_DAO(connection, itemSeq) {
    const Query = "select * from comb_prohibit where item_seq =?";
    const [Rows] = await connection.query(Query, itemSeq);
    return Rows;
}
