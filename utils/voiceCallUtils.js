import twilio from 'twilio';

const accountSid = '';
const authToken = '';
const twilioClient = new twilio(accountSid, authToken);
const makeVoiceCall = async (phoneNumber) => {
    try {
        console.log(phoneNumber);
        const twilioPhoneNumber = '';
        const twimlUrl = ''; 

        const call = await twilioClient.calls.create({
            to: `+91${phoneNumber}`,
            from: `+${twilioPhoneNumber}`,
            url: twimlUrl,
            method: 'GET',
        });

        console.log(`Voice call SID: ${call.sid}`);
        return true;
    } catch (error) {
        console.error('Error making voice call:', error);
        return false;
    }
};

export default makeVoiceCall;
