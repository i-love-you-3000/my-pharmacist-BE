export async function insertUserToken_Dao(connection, param) {
    const Query = `
        insert into user_token(id, user_token) values(?,?) ;
    `;

    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function getUserToken_Dao(connection, param) {
    const Query = `
        select user_token from user_tokens where id = ?;
    `;

    const [Rows] = await connection.query(Query, param);
    return Rows;
}

export async function deleteUserToken_Dao(connection, param) {
    const Query = `
        delete from user_tokens where user_token = ?;
    `;

    const [Rows] = await connection.query(Query, param);
    return Rows;
}
