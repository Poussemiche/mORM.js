import { Client } from 'pg';
import Core from './core';

export default class PostgreSQL extends Core {
    constructor(options) {
        super(options);
    }
    async initialize() {
        const { host, port, username, password, database } = this;

        this.client = new Client({
            user: username,
            host,
            port,
            database,
            password
        });
        try {
            await this.client.connect();
            await this.deleteTable();
            await this.createTable();
        } catch (e) {
            console.log(`Error: There is no database ${database}`)
        }
    }

    async deleteTable() {
        if (this.synchronize) {
            await this.entities.forEach(e => {
                this.client.query(`DROP TABLE IF EXISTS ${e.name.toLowerCase()}`)
            });
        }
        console.log('Table deleted')
    }

    async createTable() {
        await this.entities.forEach(e => {
            const keys = Object.keys(e.meta().columns);
            const params = keys
                .map( (key) => {
                    const value = e.meta().columns[key];
                    return `${key} ${value.generated ? " SERIAL" : this.toPostgresType(value.type)}${value.primary ? " PRIMARY KEY" : ""}` ;                    }).join(", ")
                    this.client.query(`CREATE TABLE IF NOT EXISTS ${e.name.toLowerCase()} (${params})`);
                    console.log('Table created')
        });
    }
    
        toPostgresType(type){
            const typesPostgres = {
                number: "integer",
                string: "text"
            }
            if (typesPostgres[type]) {
                return typesPostgres[type];
            }
            throw new Error ("Postgresql Error: type conversion impossible");
        }

     //   try {
     //       await this.client.connect(); 
     //           this.client.query("SELECT NOW()", (err, res) => {
     //               console.log(err, res);
     //               this.client.end();
     //          });        } catch (e) {
     //       console.log(`Database ${database} doesn't exist`);
     //       console.log(`${e.message}`);
     //   }


    }