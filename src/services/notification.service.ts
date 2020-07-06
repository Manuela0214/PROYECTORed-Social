import { SmsNotification } from '../models';
import { NotificationDatasource } from '../datasources/notification.datasource';
const twilio = require('twilio');

export class NotificationService{
    async SmsNotification(notification: SmsNotification): Promise<boolean>{
        try{    
        const accountSid = NotificationDatasource.TWILIO_SID;
        const authToken = NotificationDatasource.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        await client.messages
              .create({
                body: notification.body,
                from: NotificationDatasource.TWILIO_FROM,
                to: notification.to
            })
              .then((message:any) => {
              console.log(message) 
              });
        return true;
        }catch(error){
        return false;
        }
    }
}