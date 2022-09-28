function downloadJson(json) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(json);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'result.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

const input = document.querySelector('#file');
input.addEventListener('change', function(event){
    var reader = new FileReader();
    reader.onload = event => handleList(event.target.result);
    reader.readAsText(event.target.files[0]);

});

function handleList(json) {
    const service = new SortingAndSelection();
    const result = service.handle(json);

    downloadJson(result);
}

class SortingAndSelection {

    handle(json) {
        const value = JSON.parse(json);
        let result = value.data;

        if (value.condition) {
            if (value.condition.include) {
                result = this.include(result, value.condition.include);
            }

            if (value.condition.exclude) {
                result = this.exclude(result, value.condition.exclude);
            }

            if (value.condition.sort_by) {
                result = this.sortBy(result, value.condition.sort_by);
            }
        }

        return result;
    }
    
    sortBy(data, fields) {
        return data.sort((a, b) => {
            if (!fields.length) {
                return 0;
            }

            for(let i = 0; i < fields.length; i++) {
                let field = fields[i];
                let result;

                if (typeof data[0][field] === 'number') {
                    result = b[field] - a[field];
                } else {
                    result = a[field].localeCompare(b[field]);
                }

                if (result) {
                    return result;
                }
            }

            return 0;
        });
    }

    include(data, values) {
        return data.filter(item => {
            for (var i = 0; i < values.length; i++) {
                for (const key in values[i]) {
                  if (item[key] !== values[i][key]) {
                    return false;
                  }
                }
            }
            
            return true;
        });
    }

    exclude(data, values) {
        return data.filter(item => {
            for (var i = 0; i < values.length; i++) {
                for (const key in values[i]) {
                  if (item[key] === values[i][key]) {
                    return false;
                  }
                }
            }

            return true;
        });
    }
}
