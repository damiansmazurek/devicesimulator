import { DeviceSimulatorService } from './services/device-simulator.service';
import { AzureDeviceConnector } from './connectors/azure.amqp.connector';

(function main() {
    var deviceConnectionString = "{deviceConnectionString}";
    var amqpConnector = new AzureDeviceConnector();
    var deviceSimulator = new DeviceSimulatorService();
    amqpConnector.connectToIotHub(deviceConnectionString);
    deviceSimulator.generateRandomDataInTimeInterval().subscribe((data) => {
        //console.log(data);
        amqpConnector.sendMessageToCloud(data);
    });
})();

