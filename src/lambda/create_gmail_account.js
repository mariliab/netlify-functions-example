exports.handler = (lambdaEvent, context, callback) => {
    const hasuraEvent = JSON.parse(lambdaEvent.body);
    const data = hasuraEvent.event.data;
    console.log("DATA: " + JSON.stringify(data, null, 2))
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({recievedData: data})
    });
}

// import querystring from "querystring";
// import fetch from "node-fetch";

// exports.handler = async (event, context) => {

//     if (event.httpMethod !== "POST") {
//         return { statusCode: 405, body: "Method Not Allowed" };
//     }

//     const hasuraEvent = JSON.parse(event.body);
//     const data = hasuraEvent.event.data.new

//     const userEmail = data.userEmail
//     const userId = data.userId



//     //IF SUCCESS????
//     const url = process.env.HASURA_DATABASE_URL;
//     const insertUserQuery = `
//     mutation($userId: String!, $userEmail: String! ){
//         insert_users(objects: [{ id: $userId, email: $userEmail }], on_conflict: { constraint: users_pkey, update_columns: [] }) {
//         affected_rows
//         }
//     }`;

//     const graphqlReq = { "query": insertUserQuery, "variables": { "userId": userId, "userEmail": userEmail } };

//     return fetch(process.env.HASURA_DATABASE_URL {
//         headers: {
//           "content-type": "application/json", 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
//         },
//         method: "POST",
//         body: JSON.stringify(graphqlReq) })
//     })

//     .then(() => ({
//         statusCode: 200,
//         body: JSON.stringify(graphqlReq)
//       }))
//     .catch(error => ({
//         statusCode: 422,
//         body: `Oops! Something went wrong. ${error}`
//     }));
// }
