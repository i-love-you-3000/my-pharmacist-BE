export async function insertPrescription_DAO(connection, param) {
    const Query =
        "insert into prescription(id, item_seq,register_date,breakfast,lunch,dinner,baw,intake_period,exp_period) values(?,?,?,?,?,?,?,?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function updatePrescription_DAO(connection, param) {
    const Query =
        "update prescription set register_date =? and breakfast =? and lunch =? and dinner =? and baw =? and intake_period =? and exp_period where id =? and item_seq=?";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deleteMedicineInPSPT_DAO(connection, param) {
    const Query = "delete from prescription where id=?and item_seq=?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deletePrescription_DAO(connection, param) {
    const Query = "delete from prescription where id=?and item_seq=? and register_date =?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function getPrescription_DAO(connection, id) {
    const Query = "select * from prescription where id=?;";
    const [Rows] = await connection.query(Query, id);
    return Rows;
}
