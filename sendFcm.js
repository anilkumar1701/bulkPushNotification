var FCM = require('fcm-push');
var serverkey = 'AAAAcodJEus:APA91bFz8ykoYwV3rKhBaWAIwR8-5jQ9Z3dRO9mxvtYQXXwrOLu7kwqHSUxcYJ63L1J5MG4Qd66rA4A_sAXYyYan7G0lUlY7BQsZRKOMttzN4i17kpAYTyB_A19acPN7gqaxGxTe_vmR';
var fcm = new FCM(serverkey);
var _ = require('underscore');

let getDeviceDataFromDb = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.query(` SELECT * from tb_device `, (err, data) => {
                    if (err) reject(err);
                    console.log(data);
                    return resolve(data);
                });

        } catch (error) {
            console.log(error);
            return error;
        }
    })

}

module.exports = {
    sendPush: async function () {
        const data = await getDeviceDataFromDb();
        let deviceToken = _.pluck(data, 'device_token');
        const chunks = _.chunk(deviceToken, 1000);
        var message = {
                notification: {
                    title: 'Push Notification Send',
                    body:  "Notification Send Successfully"
                },
            };
        const promises = _.map(chunks, (e) => {
            message.registration_ids = e;
            return sendBulkPushNotification(message);
        });
        return Promise.all(promises);
    }
};


function sendBulkPushNotification(message) { 
        fcm.send(message, function(err,response){ 
            if(err) {
            console.log("Something has gone wrong !", err);
            } else {
            console.log("Successfully sent with resposne :",response);
            return {statusCode : 200,
                ResponseMessage :"Push Sent Successfully",
            data: response};
            }
            });            
}