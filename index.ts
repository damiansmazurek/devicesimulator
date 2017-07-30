import { DeviceSimulatorService } from './services/device-simulator.service';
import { AzureDeviceConnector } from './connectors/azure.amqp.connector';
import { Constants } from "./app.constants";

(function main() {
    var amqpConnector = new AzureDeviceConnector();
    var deviceSimulator = new DeviceSimulatorService();
    amqpConnector.connectToIotHub(Constants.DeviceConnectionString);
    deviceSimulator.generateRandomDataInTimeInterval().subscribe((data) => {
        amqpConnector.sendMessageToCloud(data);
    });
    deviceSimulator.generateEventsInTimeInterval(60000).subscribe(event =>{
        amqpConnector.sendMessageToCloud(event);
    });
    amqpConnector.subscribeForReceivedMessage().subscribe( (data)=>{
        if(data){
            try{
            console.log(data.bodyMessage());
            console.log(JSON.parse(data.transportObj.body.toString()));
            }
        catch(e){
            console.log(e);
        }
        }
        
    });
})();

