const HASURA_OPERATION = `
mutation ($id: String!, $gmailAddress: String!) {
  update_employees(where: {id: {_eq: $id}}, _set: {gmailAddress: $gmailAddress}) {
    affected_rows
    returning {
      gmailAddress
      id
      name
    }
  }
}
`;

exports.handler = (lambdaEvent, context, callback) => {
    const hasuraEvent = JSON.parse(lambdaEvent.body);
    const data = hasuraEvent.event.data;
    console.log("DATA: " + JSON.stringify(data, null, 2))

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({recievedData: data})
    });

    // const variables = data.new
    
    // return fetch("https://mt-onboarding-app-dev.herokuapp.com/v1/graphql", {
    //     headers: {
    //       "content-type": "application/json"
    //     },
    //     method: "POST",
    //     body: JSON.stringify({ query: HASURA_OPERATION, variables })
    //   })
    //     .then(() => ({
    //       statusCode: 200,
    //       body: `Ok!`
    //     }))
    //     .catch(error => ({
    //       statusCode: 422,
    //       body: `Oops! Something went wrong. ${error}`
    //     }));
}