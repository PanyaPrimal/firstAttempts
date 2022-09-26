import config from "./config.json" assert { type: "json" };

class UnitsConverter {
    convert(jsonValue) {
        const value = JSON.parse(jsonValue);// todo handle wrong jsonValue

        const mm = this.getMillimeters(value.distance.value, value.distance.unit);

        const resultValue = this.generateFromMillimeters(mm, value.convert_to);

        const resultAnswer = {
            unit: value.convert_to,
            value: resultValue.toFixed(2)
        };

        const exitValue = JSON.stringify(resultAnswer);
        console.log(exitValue);
        return exitValue;
        
    }
    
    generateFromMillimeters(value, unit) {
        return value/config.valuesInMillimeters[unit];
    }
    
    getMillimeters(value, unit) {
        return value*config.valuesInMillimeters[unit];
    }

    addValuesToConfig(json, unit, value) {
        json.valuesInMillimeters = { ...json.valuesInMillimeters, [unit]: value };
        return json;
    };
    
}

let converter = new UnitsConverter;
converter.convert(`{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}`);

converter.addValuesToConfig(config, 'mm', 1);
converter.addValuesToConfig(config, 'yd', 914.4);
converter.addValuesToConfig(config, 'km', 1000000);

converter.convert(`{"distance": {"unit": "m", "value": 5000}, "convert_to": "km"}`);

