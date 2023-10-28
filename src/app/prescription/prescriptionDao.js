export async function insertPrescription_DAO(connection, param) {
    const Query =
        "insert into prescription(id, item_seq,register_date,breakfast,lunch,dinner,baw,intake_period,exp_period) values(?,?,?,?,?,?,?,?,?);";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function updatePrescription_DAO(connection, param) {
    const Query =
        "update prescription set breakfast =? , lunch =? , dinner =? , baw =? , intake_period =? , exp_period=? where id =? and item_seq=? and register_date=?";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deleteMedicineInPSPT_DAO(connection, param) {
    const Query = "delete from prescription where id=?and item_seq=? and register_date=?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deletePrescription_DAO(connection, param) {
    const Query = "delete from prescription where id=?and register_date =?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function getPrescription_DAO(connection, id) {
    const Query =
        "select p.item_seq, m.item_name, p.register_date from prescription as p natural join medicine as m where id=? order by p.register_date;";
    const [Rows] = await connection.query(Query, id);
    return Rows;
}

export async function getPrescriptionDetail_DAO(connection, param) {
    const Query =
        "select p.item_seq, m.item_name, p.register_date, p.breakfast, p.lunch, p.dinner, p.baw, p.intake_period,p.exp_period from prescription as p natural join medicine as m where id=?and item_seq=? and register_date =?;";
    const [Rows] = await connection.query(Query, param);
    return Rows;
}
