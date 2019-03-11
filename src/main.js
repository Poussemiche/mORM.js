import mOrm from './mOrm'

const orm = new mOrm();

(async () => {
   try {
        await orm.createConnection({
            uri: "postgres://postgres:gabriel@localhost:5432/ilovepragmatic"
   })
   } catch(err){
       console.log(err);
       process.exit(-1);
   }
})();