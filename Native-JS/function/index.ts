import {StudentType} from "./type";

const sum = (a:number, b:number) => {
    return a + b;
}
const res = sum(sum(1,2), sum(2,4));

export const addSkill = (student: StudentType, skill: string) =>{
    student.skill.push({
        id: (student.skill.length+1),
        title: skill
    })
}

export function updateActive (student: StudentType, active: boolean) {
    student.active = active;
}

const myName = "Lena";
const myLastName = 'Drozdova';

const sentense = `My name ${myName} my last name ${myLastName}`;