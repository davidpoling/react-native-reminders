const URL = require("url");
class RemindersRestService {
  constructor(remindersService) {
    this.remindersService = remindersService;
  }

  handleRequest(req, res, url) {
    switch (url.path) {
      case "/reminders":
        this.handleGetReminders(res);
        break;
      case "/reminders/add":
        this.handleAddReminder(req, res);
        break;
    }

    if (url.path.includes("/reminders/delete")) {
      this.handleDeleteReminder(res, url);
    }
  }

  handleGetReminders(res) {
    return this.remindersService.getReminders().then(
      reminders => {
        this.respondToClient(res, JSON.stringify(reminders));
      },
      error => {
        console.log(error);
        this.respondToClientError(res, error);
      }
    );
  }

  handleAddReminder(req, res) {
    let reminder = "";
    req
      .on("data", data => {
        reminder += data;
      })
      .on("end", () => {
        reminder = JSON.parse(reminder);
        this.remindersService.addReminder(reminder).then(
          addedReminder => {
            this.respondToClient(res, JSON.stringify(addedReminder));
          },
          error => {
            console.log(error);
            this.respondToClientError(res, error);
          }
        );
      });
  }

  handleDeleteReminder(res, url) {
    const reminderId = url.path.split("/")[3];
    return this.remindersService.deleteReminder(reminderId).then(
      deletedId => {
        this.respondToClient(res, deletedId);
      },
      error => {
        console.log(error);
        this.respondToClientError(res, error);
      }
    );
  }

  respondToClient(response, content) {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.end(content);
  }

  respondToClientError(response, errorMsg) {
    response.statusCode = 500;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.end(errorMsg);
  }
}

module.exports = RemindersRestService;
