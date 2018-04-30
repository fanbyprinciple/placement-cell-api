Two schemas in api -

1. Student
var studentSchema = new Schema({
    name: String,
    department: String,
    sid: Number,
    percentage: Number
});

2. Company
var companySchema = new Schema({
    cname: String,
    cid: Number,
    regsid: [] // array of all registered students 
});

The api has following function calls : at localhost:8080/
    1. students - returns all students in db
    2. addStudent - add a student
    3. editStudent - edits a student with given sid
    4. removeStudent - removes a student with given sid
    5. companys - returns all registered companies
    6. registerCompany - register the company
    7. unregisterCompany - unregister the company
    8. registerStudent -  register a student with a company
    9. unregisterStudent - unregister a student (using sid) with a company (using cid)

Additional implementations -
-Added mechanism for logging by using colorization of logger timestamps.
-Added Chai library for validation.
-Additionally almost every function call has its own associated error handling mechanism.
