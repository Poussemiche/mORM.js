import { isEmpty } from 'lodash';
import { existsSync } from 'fs';
import path from 'path';
import PostgreSQL from './engine/postgresql';

export default class mOrm {
    configPathName = "./mOrm.config.json";
  
    async createConnection(dbConfig = {}) {
        if (isEmpty(dbConfig)) {
            console.log(__dirname);
    
            if (!existsSync(path.join(__dirname, this.configPathName))) {
                throw new Error("Configuration file m0rm.config.json required")
            }
            this.config = require(this.configPathName);
        } else {
            if ( dbConfig.uri){
                // "uri": "postgres://postgres:gabriel@localhost:5432/ilovepragmatic"
                const regExp = /^(.*):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/g;

                const [, type, username, password, host, port, database] = regExp.exec(dbConfig.uri);
                const synchronize = dbConfig.synchronize;
                const entities = dbConfig.entities;

                this.config = {
                    type,
                    username,
                    password,
                    host,
                    port, 
                    database
                }; 
            } else {
                this.config = dbConfig; 
            }          
        }
            
        this.config.synchronize = dbConfig.synchronize;
        this.config.entities = dbConfig.entities;
        this.entities = {};

        dbConfig.entities.forEach(sEntity => {
            this.entities[sEntity.name] = sEntity;
        });

            //Init database engine
            switch(this.config.type){
                case 'postgres':
                    this.dbInstance = new PostgreSQL(this.config);
                    break;
                case 'mysql':
                    this.dbInstance = new MySQL(this.config);
                    break;
                default: 
                throw new Error (`Engine ${this.config.type} not supported`);
            }
            await this.dbInstance.initialize();
            console.log(`Connection to ${this.config.database} established with success`);
    }
        getEntity(name) {
            for(let entity in this.entities){
              if (entity.toLowerCase() == name.toLowerCase()) {
                return new this.entities[entity](this.dbInstance, name);
              }
            }
            throw new Error(`Table error: ${name} doesn't exist`);
        }
}