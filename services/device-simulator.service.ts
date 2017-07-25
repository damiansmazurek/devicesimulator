import { Observable } from 'rxjs/observable';
import { BehaviorSubject  } from 'rxjs/BehaviorSubject'
import { DataEntity } from "../models/data-entity.model";
export class DeviceSimulatorService {
    $data: BehaviorSubject<DataEntity>;
    constructor() {
        this.$data = new BehaviorSubject(null);
    }
    generateRandomDataInTimeInterval(timeout: number = 30000): BehaviorSubject<DataEntity> {
        this.generateData(this, timeout);
        return this.$data;
    }
    private generateData(self: DeviceSimulatorService, timeout: number = 30000) {
        let dataJson: DataEntity = {
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
            self.generateData(self, timeout);
        }, timeout)
    }
}