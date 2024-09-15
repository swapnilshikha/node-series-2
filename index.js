const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer( (req, res) => {
    // arrow function is there to process the incoming function

    const log = `${Date.now()} : ${req.method} ${req.url} New Request Received ...\n`;
    const myUrl = url.parse(req.url, true);  //true will discrete the objects more effectively like, myname, userid
    console.log(myUrl);

        fs.appendFile("log.txt", log, (err, data) => {  
           
            //use a non-blocking request ,i.e, Asynchronous append function, so that next command don't have to wait

            switch(req.url) //we can control multi route using switch
            {
                case '/': 
                if (req.method === 'GET') res.end("HOME PAGE ...");
                break

                case '/about':
                const username = myUrl.query.myname //if query parameters are not passed it will show, --- HI, undefined
                res.end(`HI, ${username}`)
                break;

                case "/signup" :
                    if (req.method === 'GET') res.end("THIS IS A SIGN-UP FORM");
                    else if (req.method === 'POST') {

                        //DB Query
                        res.end("SUCESSFULLY SIGN-IN")
                    }

                default: res.end("Hello from server...."); 
            }
     });
   
    
    //if you make any changes in the running server, it will not reflect, we have to kill the server by ^c, and start again by--- npm start
});

myServer.listen(8000, () => console.log("Server Started ... !")); //this message is for myself