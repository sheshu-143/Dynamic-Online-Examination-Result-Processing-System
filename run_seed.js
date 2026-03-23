const fs = require('fs');
const path = require('path');
const db = require('./config/database');

const sql = fs.readFileSync(path.join(__dirname, 'seed_data.sql')).toString();

// mysql2 allows multiple statements if enabled, but we should just split by ';' for safety
const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);

async function runSeed() {
    console.log('Starting seed...');
    for (let statement of statements) {
        try {
            await new Promise((resolve, reject) => {
                db.query(statement, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            console.log('Executed:', statement.substring(0, 50) + '...');
        } catch (e) {
            console.error('Error executing:', statement.substring(0, 50) + '...', e.message);
        }
    }
    console.log('Seed check complete.');
    process.exit(0);
}

runSeed();
