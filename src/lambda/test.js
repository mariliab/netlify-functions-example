exports.handler = (lambdaEvent, context, callback) => {
    const hasuraEvent = JSON.parse(lambdaEvent.body);
    const data = hasuraEvent.event.data.new;
    console.log(data.name + " was added!")
    console.log("DATA: " + JSON.stringify(data, null, 2))
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({recievedData: data})
    });
}