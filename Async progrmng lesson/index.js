const http = {
    get(url) {
        let task = {
            
            setCallbacks(completeCallback, failCallback) {
                this.completeCallback = completeCallback;
                this.failCallback = failCallback;
            }
        };

        if (!url) throw new Error('URL ne peredan');

        let request = new XMLHttpRequest();

        request.onload = function() {
            if (this.status === 200) {
                try {
                    let data = JSON.parse(this.response);
                    task.completeCallback(data);
                } catch (error) {
                    task.failCallback(error);
                }
            } else {
                task.failCallback(this.statusText);
            }
        };

        request.onerror = function(error) {
            task.failCallback(error);
        };
        
        request.open('GET', url);
        request.send();


        return task;
    }
};

let task = http.get(`https://jsonplaceholder.typicode.com/users/1`);

task.setCallbacks(
    user => console.log(user),
    error => console.error(error)
);