import mOrm from './mOrm'
import Student from './entities/student'

(async () => {
    const orm = new mOrm();
    try {
            await orm.createConnection({
                uri: "postgres://postgres:gabriel@localhost:5432/ilovepragmatic",
                synchronize: true,
                entities: [
                    Student
                ],
            })
    } catch(err){
        console.log(err);
        process.exit(-1);
    }
})();