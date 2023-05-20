const connection = require('./connection');

const getAll = async() => {
    const [tasks] = await connection.execute('SELECT A.id, A.password, B.context, B.allow, C.max_contacts from ps_auths as A inner join ps_endpoints as B on A.id = B.id inner JOIN ps_aors as C on A.id = C.id');
    return tasks;
};

const createRamal = async (task) => {
    const {id} = task;

    const query = 'INSERT INTO ps_auths (id, auth_type, password, username) values (?, ?, ?, ?)';
    const query1 = 'INSERT INTO ps_aors (id, max_contacts, qualify_frequency) values (?, ?, ?);';
    const query2 = 'INSERT INTO ps_endpoints (id, transport, aors, auth, context, disallow, allow, direct_media, deny, permit, mailboxes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const createdRamal = await connection.execute(query, [102,'userpass',102,102]);
    const createdAor = await connection.execute(query1,[102,2,30]);
    const createdEndpoint = await connection.execute(query2,[102, 'transport-udp', 102, 102, 'testing', 'all', 'ulaw,alaw,gsm', 'no', '0.0.0.0/0', '0.0.0.0/0', '103@default']);
                                                
    return {insertId: createdRamal.insertId};
   
};

const deleteRamal = async (id) => {
    const removedRamal = await connection.execute ('DELETE FROM ps_auths WHERE id = ?', [id]);
    const removedAors = await connection.execute ('DELETE FROM ps_aors WHERE id = ?', [id]);
    const removedEndpoints = await connection.execute ('DELETE FROM ps_endpoints WHERE id = ?', [id]);
    return removedRamal;
};

const updateRamal = async (id, task) => {
    const {password,username, allow,max_contacts } = task;

    const query = 'UPDATE ps_auths SET password=?, username=? WHERE id = ?';
    const query1 = 'UPDATE ps_aors SET max_contacts=? WHERE id = ? ';
    const query2 = 'UPDATE ps_endpoints SET allow=? WHERE id = ? ';
  
    const updatedRamal = await connection.execute (query,[password,username, id]);
    const updateAor = await connection.execute (query1,[max_contacts, id]);
    const updatedEndpoint = await connection.execute (query2,[allow, id]);

    return updatedRamal;
};

module.exports = {
 getAll,
 createRamal,
 deleteRamal,
 updateRamal
};