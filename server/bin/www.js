import { app, server } from "../app.js";
const port = process.env.PORT || 3003;

server.listen(port, () => {
    console.log(`server running at ${port}`);
});