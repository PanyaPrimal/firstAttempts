class Task {
    static defer(fn) {
        setTimeout(fn, 0);
    }

    static isTask(value) {
        return value instanceof Task;
    }

    static complete(value) {
        return new Task (complete => complete(value));
    }

    static fail(value) {
        return new Task (fail => fail(error));
    }
    
    constructor(executor) {
        this.state = Task.state.PENDING;
        this.result = null;
        this.reason = null;
        this.onSuccess = [];
        this.onFail = [];

        if (executor) {
            executor(this.complete.bind(this), this.fail.bind(this));
        }
    }

    complete(value) {
        let isTask = Task.isTask(value);

        if (isTask) {
            let task = value;

            task.then(
                value => this.complete(value),
                reason => this.fail(reason)
            );
        } else {
            this.succeed(value);
        }
    }

    succeed(result) {
        this.state = Task.state.SUCCEEDED;
        this.result = result;
        this.onSuccess.forEach(callback => callback(result));
    }

    fail(error) {
        this.state = Task.state.FAILED;
        this.error = error;
        this.onFail.forEach(callback => callback(error));
    }

    done(onSuccess, onFail) {
        Task.defer(() => {
            if (this.state === Task.state.PENDING) {
                this.onSuccess.push(onSuccess);
                this.onFail.push(onFail);
            } else if (this.state === Task.state.SUCCEEDED && typeof onSuccess === 'function') {
                onSuccess(this.result);
            } else if (this.state === Task.state.FAILED && typeof onFail === 'function') {
                onFail(this.reason);
            }
        });
    }

    then(onSuccess, onFail) {
        return new Task((complete, fail) => {
            this.done(
                result => {
                    if (typeof onSuccess === 'function') {
                        try{
                            complete(onSuccess(result));
                        } catch (error) {
                            fail(error);
                        }
                    } else {
                        complete(result);
                    }
                },
                reason => {
                    if (typeof onFail === 'function') {
                        try{
                            complete(onFail(reason));
                        } catch (error) {
                            fail(error);
                        }
                    } else {
                        fail(reason);
                    }
                }
            );
        });
    }
    catch(onFail) {
        return this.then(null, onFail);
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

http.get(`https://jsonplaceholder.typicode.com/users?userId=1`)
    .then(user => {
        console.log(user);
        
        return http.get(`https://jsonplaceholder.typicode.com/posts?userId=1`)
    })
    .then(posts => console.log(posts));
 