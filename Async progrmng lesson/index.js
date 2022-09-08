const http = {
    get(url) {
        let task = {
            onComplete: [],
            onFail: [],

            setCallbacks(completeCallback, failCallback) {
                this.onComplete.push(completeCallback);
                this.onFail.push(failCallback);
            }
        };

        if (!url) throw new Error('URL ne peredan');

        let request = new XMLHttpRequest();

        request.onload = function() {
            if (this.status === 200) {
                try {
                    let data = JSON.parse(this.response);
                    task.onComplete.forEach(callback => callback(data));
                } catch (error) {
                    task.onFail.forEach(callback => callback(data));
                }
            } else {
                task.onFail.forEach(callback => callback(data));
            }
        };

        request.onerror = function(error) {
            task.onFail.forEach(callback => callback(data));
        };
        
        request.open('GET', url);
        request.send(); 


        return task;
    }
};

let getUser = http.get(`https://jsonplaceholder.typicode.com/users/1`);

getUser.setCallbacks(
    user => console.log(user),
    error => console.error(error)
);

getUser.setCallbacks(user => console.log(user));