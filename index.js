const { exec } = require('child_process');
const mysql = require('mysql2');
const { Command } = require('commander');
require('dotenv').config();

const program = new Command();

program
.version('1.0.0')
.description('MySQL Backup CLI Utility')
.option('-d, --database <name>', 'Database name')
.option('-u, --user <name>', 'Database user', process.env.DB_USER) // to pull the username 
.option('-p, --password <password>', 'Database password', process.env.DB_PASSWORD)
.option('-h, --host <host>', 'Database host', process.env.DB_HOST || 'localhost')
.option('-o, --output <file>', 'Output file', `back_${Date.now().sql}`)

const options = program.opts();