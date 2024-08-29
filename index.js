const { exec } = require('child_process');
const mysql = require('mysql2');
const { Command } = require('commander');
const { stdout, stderr } = require('process');
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

//reminder
if(!options.database){
    console.error('Database name is required');
    process.exit(1);
}

const backupCommand = `mysqldump -u ${options.user} -p ${options.password} -h ${options.host} ${options.database} > ${options.output}`;

exec(backupCommand, (error, stdout, stderr) => {
    if(error) {
        console.log(`Error executing backup: ${error.message}`);
        return;
    }
    console.log(`Backup completed successfully!: ${options.output}`);
});