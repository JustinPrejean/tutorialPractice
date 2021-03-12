const { Socket } = require("socket.io");

const mongo = require("mongodb").MongoClient;
const client = require("socket.io")();

// Connect to mongo
mongo.connect("mongodb://127.0.0.1/mongochat", (err, db) => {
  if (err) {
    throw err;
  } else {
  }
  console.log("MongoDB connected...");

  // Connect to Socket.io
  client.on("connection", () => {
    let chat = db.collection("chats");

    // Create function to send status
    sendStatus = (s) => {
      socket.emit("status", s);
    };

    // Get chats from mongo collection
    chat
      .find()
      .limit(100)
      .sort({ _id: 1 })
      .toArray((err, res) => {
        if (err) {
          throw err;
        }

        // Emit the messages
        socket.emit("output", res);
      });

    // Handle input events
    socket.on("input", (data) => {
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if (name == "" || message == "") {
        // Send error status
        sendStatus("Please enter a name and message");
      } else {
        // Insert message
        chat.insert({ name, message }, () => {
          client.emit("output", [data]);

          // Sent status object
          sendStatus({
            message: "Message sent",
            clear: true,
          });
        });
      }
    });

    // Handle clear
    socket.on("clear", (data) => {
      // remove all chats from collection
      chat.remove({}, () => {
        // Emit cleared
        socket.emit("cleared");
      });
    });
  });
});

client.listen(4000);
