import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { DataEntity } from "../models/data-entity.model";
import { EventEntity } from "../models/event-entity.model";
export class DeviceSimulatorService {
    $data: BehaviorSubject<DataEntity>;
    $events: BehaviorSubject<EventEntity>;
    $binaryFiles: BehaviorSubject<any>;
    $cloudToDeviceMessage: BehaviorSubject<any>;
    constructor() {
        this.$data = new BehaviorSubject(null);
    }
    generateRandomDataInTimeInterval(timeout: number = 30000): BehaviorSubject<DataEntity> {
        this.generateMetricData(this, timeout);
        return this.$data;
    }
    private generateMetricData(self: DeviceSimulatorService, timeout: number = 30000) {
        let dataJson: DataEntity = {
            messageType: "measurements",
            Group1: {
                a1: Math.random() * 5,
                a2: Math.random() * 8,
                a3: Math.random() * 6
            },
            Group2: {
                b1: Math.random() * (150 - 100) + 100,
                b2: Math.random() * (200 - 180) + 180,
                b3: Math.random() * (130 - 100) + 100,
            },
            timestamp: Date.now()

        }
        self.$data.next(dataJson);

        setTimeout(() => {
            self.generateMetricData(self, timeout);
        }, timeout)
    }
    private generateStartEventsData(self: DeviceSimulatorService, timeout: number = 30000) {
        let alarmId = Math.random() *1000;
         let dataJson: EventEntity = {
            messageType: "event",
            message: "Alarm "+alarmId,
            state: "start",
            level: "alarm",
            id: alarmId,
            timestamp: Date.now()

        }
        self.$events.next(dataJson);
        setTimeout(() => {
            self.generateEndEventData(self, timeout);
        }, timeout)
        setTimeout(() => {
            self.generateStartEventsData(self, timeout);
        }, 2*timeout)
    }
    generateEndEventData(self: DeviceSimulatorService, alarmId: number){
         let dataJson: EventEntity = {
            messageType: "event",
            message: "Alarm end"+alarmId,
            state: "stop",
            level: "alarm",
            id: alarmId,
            timestamp: Date.now()
        }
    }
    private generateFileData(self: DeviceSimulatorService, timeout: number = 30000) {

    }
    
}