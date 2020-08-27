// import querystring from "querystring";
// import fetch from "node-fetch";

// exports.handler = async (event, context) => {
//   // Only allow POST
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: "Method Not Allowed" };
//   }
//   const params = querystring.parse(event.body);

//   const hasuraEvent = JSON.parse(event.body);
//   const data = hasuraEvent.event.data.new
//   const email = data.email

//   // Invite user to Slack
//   return fetch(slack.com/api/users.admin.invite?token=$TOKEN&email=${email}&channels=CN6RP1KHP , {
//     headers: {
//       "content-type": "application/json"
//     },
//     method: "POST",
//     body: JSON.stringify({ text: `??` })
//   })
//     .then(() => ({
//       statusCode: 200,
//       body: `${data.username} added a new comment to ${data.employee_name}!`
//     }))
//     .catch(error => ({
//       statusCode: 422,
//       body: `Oops! Something went wrong. ${error}`
//     }));
// };
