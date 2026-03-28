// generateUsers.js
const fs = require("fs");
const { faker } = require("@faker-js/faker");

const TOTAL = 10_000;
const FILE = "users.json";

const stream = fs.createWriteStream(FILE);

stream.write("[\n");

for (let i = 0; i < TOTAL; i++) {
    const user = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const json = JSON.stringify(user);

    if (i !== TOTAL - 1) {
        stream.write(json + ",\n");
    } else {
        stream.write(json + "\n");
    }

    // Optional: progress log
    if (i % 100000 === 0) {
        console.log(`Generated ${i} users...`);
    }
}

stream.write("]");
stream.end();

stream.on("finish", () => {
    console.log("✅ 1M users JSON file created!");
});