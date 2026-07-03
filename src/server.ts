//npm i typescript @types/node tsx tsup -D

import { app } from "./app";
import { env } from "./env";

app.listen({
    host: "0.0.0.0",
    port: env.PORT,
}).then (() => {
    console.log("HTTP Server running!");
})