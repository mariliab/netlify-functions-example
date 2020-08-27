const fetch = require ('node-fetch');

const HASURA_ADDMAILTOEMPLOYEE = `
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

const executeAddMailToEmployee = async (variables) => {
  const result = await fetch ("https://mt-onboarding-app-dev.herokuapp.com/v1/graphql", {
    method: 'POST',
    body: JSON.stringify({
      query: HASURA_ADDMAILTOEMPLOYEE,
      variables
    })
  });

  const data = await result.json();
  console.log('DEBUG: ', data);
  return data;
};

module.exports = async function (context, req) {

  const {id, gmailAddress} = req.body.input;

  // Write business logic that deals with inputs here...


  // Execute the Hasura query
  const {data, errors} = await executeAddMailToEmployee({ id, gmailAddress }, headers);

  // If there's an error in the running the Hasura query
  if (errors) {
    context.res = {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
      body: errors[0]
    };
    return;
  }

  // If success
  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: {
      ...data.update_employees
    }
  };
};