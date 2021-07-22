const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "6fddd80a",
  apiSecret: "QY7ViyCskq4LAcJ3"
})

const from = "DibrisAdmin"
const to = "393483930505"
const text = 'Room 310 is overcrowded!!'

function sendSMS(counter) {
  if (counter == 1) {
    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]['status'] === "0") {
          console.log("Message sent successfully.");
        } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
      }
    })
  }
}

module.exports = { sendSMS };
