import { DeviceSimulatorService } from './services/device-simulator.service';
import { AzureDeviceConnector } from './connectors/azure.mqtt.connector';
import { Constants } from "./app.constants";

(function main() {
    var mqttConnector = new AzureDeviceConnector();
    var deviceSimulator = new DeviceSimulatorService();
    mqttConnector.subscribeForDeviceMethod('file').subscribe(data => {
        console.log(data.eventName);
        console.log(data.payload);
        data.response.send(200);
    });
    mqttConnector.connectToIotHub(Constants.DeviceConnectionString);
    mqttConnector.subscribeForConfiguration().subscribe(config => {
        deviceSimulator.updateConfiguration(config);
    });
    deviceSimulator.generateRandomDataInTimeInterval().subscribe((data) => {
        mqttConnector.sendMessageToCloud(data);
    });
    deviceSimulator.generateEventsInTimeInterval(60000).subscribe(event => {
        mqttConnector.sendMessageToCloud(event);
    });
    mqttConnector.subscribeForReceivedMessage().subscribe((data) => {
        if (data) {
            try {
                deviceSimulator.receiveMessageFromDevice(data);
            }
            catch (e) {
                console.log(e);
            }
        }

    });

    deviceSimulator.configurationUpdatedSubscription().subscribe(isCompleted => {
        if (isCompleted) {
            mqttConnector.completeConfigChange();
        }
    });


})();

