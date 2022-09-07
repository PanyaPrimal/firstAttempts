const http = {
    get(url, done) {
        if (!url) throw new Error('URL ne peredan');

        let request = new XMLHttpRequest();

        request.onload = function() {
            if (this.status === 200) {
                try {
                    let data = JSON.parse(this.response);
                    done(null, data);
                } catch (error) {
                    done(error);
                }
            } else {
                done(this.statusText);
            }
        };

        request.onerror = function(error) {
            done(error);
        };
        
        request.open('GET', url);
        request.send();
        
    }
};

http.get(`https://jsonplaceholder.typicode.com/users/1`, (error, user) => {
    if (error) return console.error(error);

    console.log(user);
});