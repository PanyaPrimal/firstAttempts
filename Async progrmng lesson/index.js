class Task {
    constructor(execute) {
        this.state = Task.state.PENDING;
        this.result = null;
        this.reason = null;
        this.onComplete = [];
        this.onFail = [];

        execute(this.complete.bind(this), this.fail.bind(this));
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
        if (!url) throw new Error('URL ne peredan');

        return new Task((complete, fail) => {
            let request = new XMLHttpRequest();

            request.onload = function() {
                if (this.status === 200) {
                    try {
                        let data = JSON.parse(this.response);
                        complete(data);
                    } catch (error) {
                        fail(error);
                    }
                } else {
                    fail(this.statusText);
                }
            };

            request.onerror = function(error) {
                fail(error);
            };
        
            request.open('GET', url);
            request.send(); 
        });
    }
};

let getUser = http.get(`https://jsonplaceholder.typicode.com/users/1`);

getUser.done(
    user => console.log(user),
    error => console.error(error)
);

getUser.done(user => console.log(user));