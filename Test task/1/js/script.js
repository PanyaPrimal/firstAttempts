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

function convert(json) {
    const converter = new UnitsConverter();
    const result = converter.convert(json);
    downloadJson(result);
}

function downloadJson(json) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(json);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'result.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

const input = document.querySelector('#file');
input.addEventListener('change', function(event){
    var reader = new FileReader();
    reader.onload = event => convert(event.target.result);
    reader.readAsText(event.target.files[0]);

})