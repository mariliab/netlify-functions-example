const fetch = require('node-fetch');

const adminSecret = process.env.HASURA_ADMIN_SECRET;
const hgeEndpoint = process.env.HASURA_DEV_DATABASEURL;

const query = `
mutation insertUsers ($id: String!, $email: String!, $role: String!) {
    insert_users(objects: {id: $id, email: $email, role: $role}) {
      affected_rows
    }
  }
`;  

exports.handler = (event, context, callback) => {
    let request;
    try {
        request = JSON.parse(event.body);
    } catch (e) {
        return callback(null, {statusCode: 400, body: "cannot parse hasura event"});
    }

    const response = {
        statusCode: 200,
        body: "success"
    };
    const qv = {
        id: request.event.data.new.id,
        email: request.event.data.new.email,
        role: request.event.data.new.role,
    };
    fetch(hgeEndpoint + '/v1/graphql', {
        method: 'POST',
        body: JSON.stringify({query: query, variables: qv}),
        headers: {'Content-Type': 'application/json', 'x-hasura-admin-secret': adminSecret},
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            callback(null, response);
        });
};