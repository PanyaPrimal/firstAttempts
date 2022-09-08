class Task {
    constructor() {
        this.state = Task.state.PENDING;
        this.result = null;
        this.reason = null;
        this.onComplete = [];
        this.onFail = [];
    }

    done(completeCallback, failCallback) {
        if (typeof completeCallback === 'function') {
            this.onComplete.push(completeCallback);
        }

        if (typeof failCallback === 'function') {
            this.onFail.push(failCallback);
        }
        
        if (this.state !== Task.state.PENDING) {
            if (this.state === Task.state.SUCCEEDED) {
                completeCallback(this.result);
            } else if (this.state === Task.state.FAILED) {
                failCallback(this.reason);
            }
        }
    }

    complete(result) {
        this.result = result;
        this.state = Task.state.SUCCEEDED;
        this.onComplete.forEach(callback => callback(result));
    }

    fail(reason) {
        this.reason = reason;
        this.state = Task.state.FAILED;
        this.onFail.forEach(callback => callback(reason));
    }
}

Task.state = {
    PENDING: 'PENDING',
    SUCCEEDED: 'SUCCEEDED',
    FAILED: 'FAILED'
};

const http = {
    get(url) {
        let task = new Task();

        if (!url) throw new Error('URL ne peredan');

        let request = new XMLHttpRequest();

        request.onload = function() {
            if (this.status === 200) {
                try {
                    let data = JSON.parse(this.response);
                    task.complete(data);
                } catch (error) {
                    task.fail(error);
                }
            } else {
                task.fail(this.statusText);
            }
        };

        request.onerror = function(error) {
            task.fail(error);
        };
        
        request.open('GET', url);
        request.send(); 


        return task;
    }
};

let getUser = http.get(`https://jsonplaceholder.typicode.com/users/1`);

getUser.done(
    user => console.log(user),
    error => console.error(error)
);

getUser.done(user => console.log(user));