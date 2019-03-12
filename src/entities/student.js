import Entity from "./entity";

export default class Student extends Entity {
    static meta() {
      return {
        name: "Student",
        columns: {
          id: {
            primary: true,
            generated: true
          },
          firstname: {
            type: "string"
          },
          lastname: {
            type: "string"
          },
          age: {
            type: "number",
            optional: true
          }
        }
      };
    }
  }