import querystring from "querystring";
import fetch from "node-fetch";

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const params = querystring.parse(event.body);
  const name = params.name || "World";

  const hasuraEvent = JSON.parse(event.body);
  const data = hasuraEvent.event.data.new
  console.log("HASURA EVENT: " + JSON.stringify(data, null, 2))

  // Send greeting to Slack
  return fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ text: `${data.username} added a new comment to ${data.employee_name}!` })
  })
    .then(() => ({
      statusCode: 200,
      body: `${data.username} added a new comment to ${data.employee_name}!`
    }))
    .catch(error => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`
    }));
};
