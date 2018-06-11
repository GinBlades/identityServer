const fs = require("fs");
const path = require("path");

let secrets = {};

// Default to using 'secrets.json' in root directory
try {
    const content = fs.readFileSync(path.join(__dirname, "..", "secrets.json"), "utf8");
    const data = JSON.parse(content);
    secrets = data;
} catch (err) {
    console.error(err);
}

const envVars = {
    mongoConn: "MONGO_CONN",
    redisConn: "REDIS_CONN",
    sessionSecret: "SESSION_SECRET",
    cookieSecret: "COOKIE_SECRET",
    jwtSecret: "JWT_SECRET",
    approvedOrigins: "APPROVED_ORIGINS",
    logLevel: "LOG_LEVEL"
};

// Overwrite anything set in the environment.
for (let key in envVars) {
    if (null == process.env[envVars[key]]) {
        continue;
    }
    secrets[key] = process.env[envVars[key]];
}

module.exports = secrets;
