import app from "../bootstrap.ts";
import { config } from "../config/config.ts";

app.listen(config.appPort, () => {
	console.log(`Express server listening on port ${config.appPort}`);
});