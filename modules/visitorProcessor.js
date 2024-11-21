"use scrict"
const students = [];
const courses = [];
const enrollments = [];
var st = {};
var cs = {};
var er = {};


Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    };
};

var myVisitor = function (o) {
    let _pV = {
        id: ''
        , name: ''
    };

    function privateID_set(n) {
        _pV.id = n;
    };

    function privateID_get() {
        return _pV.id;
    };

    function privateName_set(n) {
        _pV.name = n;
    };

    function privateName_get() {
        return _pV.name;
    };

    return {
        is: privateID_get()
        ,name: privateName_get()
    }
};



class Student {
    _name = '';
    _id = '';
    constructor(o) {
        this._id = o 
            ? o.id >= 0 
                ? o.id 
                : students.length 
            : students.length;
        this._name = o 
            ? o.name 
            : 'Not Set';
        students.push(this);
    };

    get id() {
        return this._id;
    };

    set name(name) {
        this._name = name;
    };

    get name() {
        return this._name;
    };

    getClasses() {
        return enrollments.filter((v) => v.student.id == this.id);
    };

    getClass(o) {
        return this.getClasses().filter((v) => v.course.id == o.id);
    };

    enrollCourse(c) {
        let er = {course: c
            , student: this
        };
        if (this.getClass(c).length == 0) {
            new Enrollment(er);
        };
    };
};

class Course {
    _name = '';
    _id = '';
    constructor(o) {
        this._id = o 
            ? o.id >= 0 
                ? o.id 
                : courses.length 
            : courses.length;
        this._name = o 
            ? o.name 
            : 'Not Set';
        courses.push(this);
    };

    get id() {
        return this._id;
    };

    set name(name) {
        this._name = name;
    };

    get name() {
        return this._name;
    };

    getStudents() {
        return enrollments.filter((v) => v.course.id == this.id);
    };

    getStudent(o) {
        return this.getStudents().filter((v) => v.student.id == o.id);
    };

    enrollStudent(s) {
        let er = {course: this
            , student: s
        };
        if (this.getStudent(s).length == 0) {
            new Enrollment(er);
        };
    };

     gradeStudent(o) {
        this.getStudent(o.student)[0].grade = o.grade;
     };
};

class Enrollment {
    _id = '';
    _student = '';
    _course = '';
    _grade = '';
    constructor(o) {
        this._id = enrollments.length;
        this._student = o.student || null;
        this._course = o.course || null;
        this._grade = o.grade ? o.grade : 'i';
        enrollments.push(this);
    };

    get enrollment() {
        return this;
    };

    get id() {
        return this._id;
    };

    get student() {
        return this._student;
    };

    get course() {
        return this._course;
    };

    set grade(g) {
        this._grade = g;
    };

    get grade() {
        return this._grade;
    };
}

st = new Student();
st.name = 'Student List';
st = new Student();
st.name = 'David';
st = new Student();
st.name = 'John';
st = new Student();
st.name = 'Steve';
st = new Student();
st.name = 'Becky';
st = new Student();
st.name = 'Chris';
st = new Student();
st.name = 'Bryan';

cs = new Course();
cs.name = 'Course List';
cs = new Course();
cs.name = 'Math 101';
cs = new Course();
cs.name = 'Science 101';
cs = new Course();
cs.name = 'Art 101';

er = students[0].enrollCourse(courses[0]); //0
er = students[1].enrollCourse(courses[1]); //1
er = students[1].enrollCourse(courses[2]);  //2
er = students[1].enrollCourse(courses[3]);  //3
er = students[2].enrollCourse(courses[2]);  //4
er = students[3].enrollCourse(courses[3]);  //5
er = courses[1].enrollStudent(students[4]); //6
er = courses[2].enrollStudent(students[4]); //7
er = courses[2].enrollStudent(students[5]); //8
er = courses[2].enrollStudent(students[6]); //9
er = courses[3].enrollStudent(students[5]); //10
er = courses[3].enrollStudent(students[6]); //11

er = students[1].enrollCourse(courses[1]); // Don't Duplicate
er = courses[1].enrollStudent(students[4]); // Don't Duplicate

gradeStudent = function(o) {
    let studentGrade = {student: students.filter((v) => v.name == o.stn)[0]
        , grade: o.grade
    };
    courses[courses.filter((v) => v.name == o.cn)[0].id].gradeStudent(studentGrade);
    
}

let studentGrade = {
    cn: 'Math 101'
    , stn: 'Becky'
    , grade: 'B'
};

gradeStudent(studentGrade);

students.map(function (i, n, a) {
    for (pn in i) {
        document.writeln("<p>" 
            + pn 
            + ": " 
            + i[pn] 
            + "</p>"
        );
    };
});

courses.map(function (i, n, a) {
    for (pn in i) {
        document.writeln("<p>" 
            + pn 
            + ": " 
            + i[pn] 
            + "</p>"
        );
    }    
});

enrollments.map(function (i, n, a) {
    document.writeln("<p>Student: "
        + i.student.name 
        + " - Course: "
        + i.course.name
        + " - Grade: "
        + i.grade
        + "</p>"
    );    
});