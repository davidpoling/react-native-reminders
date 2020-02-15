const http = require("http");
const URL = require("url");
const RemindersRestService = require("./reminders-service/rest-service/reminders-rest-service");
const RemindersService = require("./reminders-service/reminders-service/reminders-service");

const hostname = "127.0.0.1";
const port = "7779";

const server = http.createServer((req, res) => {
  console.log("Request received");
  let url = URL.parse(req.url, true);
  remindersRestService.handleRequest(req, res, url);
});

const remindersRestService = new RemindersRestService(new RemindersService());
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
