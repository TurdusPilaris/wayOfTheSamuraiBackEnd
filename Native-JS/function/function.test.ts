import {StudentType} from "./type";
import {addSkill, updateActive} from "./index";


let student: StudentType;

beforeEach(() =>
student = {
    name: 'Lena',
    active: false,
    skill: [
        {id:1, title: 'skill1'},
        {id:2, title: 'skill2'},
        {id:3, title: 'skill3'},
    ]})

test("new skill should be added to student", () =>{
    expect(student.skill.length).toBe(3);

    addSkill(student, 'JS');
    expect(student.skill.length).toBe(4);
    expect(student.skill[3].title).toBe('JS');
    expect(student.skill[3].id).toBeDefined();
})
test("student should be active", () =>{
    expect(student.active).toBe(false);

    updateActive(student, true);
    expect(student.active).toBe(true);

})