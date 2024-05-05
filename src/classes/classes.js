import moment from "moment"
import { nanoid } from "nanoid"

export class Teacher {
    constructor(fullName, username, email, password, major, profileImage) {
        this.id = nanoid()
        this.fullName = fullName
        this.username = username
        this.email = email
        this.password = password
        this.major = major
        this.profileImage = profileImage

    }
}

export class Student {
    constructor(fullName, username, email, password, profileImage) {
        this.id = nanoid()
        this.fullName = fullName
        this.username = username
        this.email = email
        this.password = password
        this.profileImage = profileImage
        this.grades = []
        
    }
    // calcAvgMethod() {
    //     if (this.grades.length === 0) {
    //         return 0;
    //     }
    //     const totalGrades = this.grades.reduce((sum, grade) => sum + parseInt(grade.grade), 0);
    //     const avgGrade = totalGrades / this.grades.length;
    //     return avgGrade;
    // }
}

export class Task {
    constructor(title, description, topic, deadline, teacherId) {
        this.id = nanoid()
        this.title = title
        this.description = description
        this.topic = topic
        this.deadline = deadline
        this.createdAt =  moment(new Date()).format('lll')
        this.teacherId = teacherId
        this.assignments=[]
       

    }
}



