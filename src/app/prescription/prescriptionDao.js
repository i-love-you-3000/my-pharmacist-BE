export async function insertPrescription_DAO(connection, param) {
    const Query = "insert into prescription(id, item_seq) values(?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function updatePrescription_DAO(connection, param) {
    const Query = "update prescription set item_seq = ? where id =? and item_seq=?";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deleteMedicineInPSPT_DAO(connection, param) {
    const Query = "delete from prescription where id=?and item_seq=?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deletePrescription_DAO(connection, param) {
    const Query = "delete from prescription where id=?and item_seq=? and post_date =?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function getPrescription_DAO(connection, id) {
    const Query = "select * from prescription where id=?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}
