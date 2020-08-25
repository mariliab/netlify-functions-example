exports.handler = (lambdaEvent, context, callback) => {
    const hasuraEvent = JSON.parse(lambdaEvent.body);
    const data = hasuraEvent.event.data.new;
    console.log("DATA: " + data)
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({recievedData: data})
    });
}