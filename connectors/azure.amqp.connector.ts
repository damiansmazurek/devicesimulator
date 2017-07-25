import { Message, Client} from 'azure-iot-device';
import {clientFromConnectionString} from 'azure-iot-device-amqp';
export class AzureDeviceConnector{
    client: Client;
      sendMessageToCloud(message) {
            var data = JSON.stringify(message);
            var iotMessage = new Message(data);
            console.log("Sending message: " + iotMessage.getData());
            this.client.sendEvent(iotMessage, this.printResultFor('send'));
        }
        printResultFor(op) {
            return function printResult(err, res) {
                if (err) console.log(op + ' error: ' + err.toString());
                if (res) console.log(op + ' status: ' + res.constructor.name);
            };
        }
        connectCallback(err) {
            if (err) {
                console.log('Could not connect: ' + err);
            } else {
                console.log('Client connected');
            }
        }
        connectToIotHub (connectionString) {
            this.client = clientFromConnectionString(connectionString);
            this.client.open(this.connectCallback);
        }
}