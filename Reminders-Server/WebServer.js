const http = require("http");
const URL = require("url");
const RemindersRestService = require("./reminders-service/rest-service/reminders-rest-service");
const RemindersService = require("./reminders-service/reminders-service/reminders-service");

const hostname = "127.0.0.1";
const port = "7779";

// TODO: Refactor to use expressjs for proper routing.
const server = http.createServer((req, res) => {
  let url = URL.parse(req.url, true);
  remindersRestService.handleRequest(req, res, url);
});

const remindersRestService = new RemindersRestService(new RemindersService());
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
/**
 * For future development:
 * 1. Use a WebSocket connection to alert the user of their reminder at any given time. Could possible just open the WebSocket connection and have a job that periodically checks the reminder times.
 * 2. Use a data store (like MongoDB) for storing reminders.
 * 3. As stated in the above TODO, refactor the backend services to use ExpressJS for proper routing.
 */
