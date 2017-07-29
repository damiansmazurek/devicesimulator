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
})();

