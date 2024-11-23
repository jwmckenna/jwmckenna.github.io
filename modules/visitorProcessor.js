"use scrict"
const visitors = []; // 1-n kioskEntries

const kioskEntryIDs = []; // 1-n visits NOTE: An entry from the kiosk has visitor, kisok, visit, and center information.
// A kioskEntryID is a contain for visits to a kiosk
// When Constructed:
// 1. If the visitor doesn't exist, add the visitor and link the kioskEntryID to the visitor

const visits = []; // n-n kioskEntries and centers
// A visit is create from a record from the Kiosk
// When Constructed:
// 1. If the center doesn't exist, add the center and link it to the visit
// 2. If the KioskEntryID doesn't exist, add the kioskEntryID and link it to the visit

const centers = []; // 1-n visits


const courses = [];
const enrollments = [];
var st = {};
var cs = {};
var er = {};

class Visit {
    _id = '';
    _center = '';
    _kioskEntryID = '';
    _name = '';
    constructor(o) {
        this._id = o 
            ? o.id >= 0 
                ? o.id 
                : visit.length 
            : visit.length;
        this._center = getCenter(o)
            ? getCenter(o)
            : new Center(o);
        this._kioskEntryID = getKioskEntryID(o)
            ? getKioskEntryID(o)
            : new KioskEntryID(o);

        visit.push(this);
    };

    getCenter = function(o) {
        return centers.filter((v) => v.id == o.center.id);
    };

    getKioskEntryID = function(o) {
        return kioskEntryIDs.filter((v) => v.id == o.kiosk.id);
    };

    get id() {
        return this._id;
    };

    get center() {
        return this._center;
    };

    get kisoEntryID() {
        return this._kioskEntryID;
    };

    set name(name) {
        this._name = name;
    };

    get name() {
        return this._name;
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

class Visitor {
    _name = '';
    _id = '';
    constructor(o) {
        this._id = o 
            ? o.id >= 0 
                ? o.id 
                : visitors.length 
            : visitors.length;
        this._name = o 
            ? o.name 
            : 'Not Set';
        visitors.push(this);
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

    getKioskEntryIDs() {
        return kioskEntryIDs.filter((v) => v.visitor.id == this.id);
    };

    getVisits(o) {
        return this.visits.filter((v) => v.visits.id == this.id);
    }

    getVisit(o) {
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

class KioskEntryID {
    _name = '';
    _id = '';
    constructor(o) {
        this._id = o 
            ? o.id >= 0 
                ? o.id 
                : kioskEntryIDs.length 
            : kioskEntryIDs.length;
        this._name = o 
            ? o.name 
            : 'Not Set';
        kioskEntryIDs.push(this);
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

    getVisitor() {
        return visitors.filter((v) => v.visitor.id == this.id);
    };


    getVisits(o) {
        return this.visits.filter((v) => v.visits.id == this.id);
    }

    getVisit(o) {
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

class Center {
    _name = '';
    _id = '';
    constructor(o) {
        this._id = o 
            ? o.id >= 0 
                ? o.id 
                : centers.length 
            : centers.length;
        this._name = o 
            ? o.name 
            : 'Not Set';
        centers.push(this);
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

    getKioskEntries(o) {
        return kioskEntries.filter((v) => v.center.id == this.id);
    };


    getVisits(o) {
        return this.getKioskEntries(o).filter((v) => v.visits.id == o.id);
    }

    getVisit(o) {
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
    , grade: 'A'
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