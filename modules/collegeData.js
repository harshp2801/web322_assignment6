const fs = require("fs");
const Sequelize = require("sequelize");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

var sequelize = new Sequelize(
  "njvipjcl",
  "njvipjcl",
  "WkTE4QGuYPXnA5YDknjZoq4F-tleKDWQ",
  {
    host: "peanut.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

let Student = sequelize.define("Student", {
  studentNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  addressStreet: Sequelize.STRING,
  addressCity: Sequelize.STRING,
  addressProvince: Sequelize.STRING,
  TA: Sequelize.BOOLEAN,
  status: Sequelize.STRING,
});

let Course = sequelize.define("Course", {
  courseId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseCode: Sequelize.STRING,
  courseDescription: Sequelize.STRING,
});

Course.hasMany(Student, { foreignKey: "course" });

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("unable to sync the database");
      });
  });
};

module.exports.getAllStudents = function () {
  return new Promise((resolve, reject) => {
    Student.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
};

module.exports.getStudentByNum = function (num) {
  return new Promise(function (resolve, reject) {
    Student.findAll({
      where: { studentNum: num },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
};

module.exports.getStudentsByCourse = function (course) {
  return new Promise(function (resolve, reject) {
    Student.findAll({
      where: { course: course },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
};

module.exports.addStudent = function (studentData) {
  return new Promise(function (resolve, reject) {
    studentData.TA = studentData.TA ? true : false;
    for (let key in studentData) {
      if (studentData[key] === "") {
        studentData[key] = null;
      }
    }
    Student.create(studentData)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

module.exports.updateStudent = function (studentData) {
  return new Promise(function (resolve, reject) {
    studentData.TA = studentData.TA ? true : false;
    for (let key in studentData) {
      if (studentData[key] === "") {
        studentData[key] = null;
      }
    }
    Student.update(studentData, {
      where: { studentNum: studentData.studentNum },
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

module.exports.deleteStudentByNum = function (studentNum) {
  return new Promise(function (resolve, reject) {
    Student.destroy({
      where: { studentNum: studentNum },
    })
      .then(() => {
        resolve("Destroyed");
      })
      .catch(() => {
        reject("Was rejected");
      });
  });
};

module.exports.getCourses = function () {
  return new Promise((resolve, reject) => {
    Course.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("no results returned");
      });
  });
};

module.exports.getCourseById = function (id) {
  return new Promise(function (resolve, reject) {
    Course.findAll({
      where: { id: id },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject("no results returned");
      });
  });
};

module.exports.addCourse = function (courseData) {
  return new Promise(function (resolve, reject) {
    courseData.TA = courseData.TA ? true : false;
    for (let key in courseData) {
      if (courseData[key] === "") {
        courseData[key] = null;
      }
    }
    Course.create(courseData)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

module.exports.updateCourse = function (courseData) {
  return new Promise(function (resolve, reject) {
    courseData.TA = courseData.TA ? true : false;
    for (let key in courseData) {
      if (courseData[key] === "") {
        courseData[key] = null;
      }
    }
    Course.update(courseData, {
      where: { courseId: courseData.courseId },
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

module.exports.deleteCourseById = function (id) {
  return new Promise(function (resolve, reject) {
    Course.destroy({
      where: { courseId: id },
    })
      .then(() => {
        resolve("destroyed");
      })
      .catch(() => {
        reject("was rejected");
      });
  });
};
