import querystring from "querystring";
import fetch from "node-fetch";

const HASURA_INSERTUSERINTODEVDATABASE = `
mutation($userId: String!, $userEmail: String! ){
    insert_users(objects: [{ id: $userId, email: $userEmail }], on_conflict: { constraint: users_pkey, update_columns: [] }) {
      affected_rows
    }
  }
`;

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = querystring.parse(event.body);
  const userId = params.event.user.user_id;
  const userEmail = params.event.user.email;

  const graphqlReq = { 
      "query": HASURA_INSERTUSERINTODEVDATABASE, 
      "variables": { 
          "userId": userId, 
          "userEmail": userEmail 
        } 
    };

  return fetch(process.env.HASURA_DEV_DATABASEURL, {
    headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET},
    method: "POST",
    body: JSON.stringify(graphqlReq)
  })
    .then(() => ({
      statusCode: 200
    }))
    .catch(error => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`
    }));
};
