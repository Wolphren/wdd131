const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`
}
const stepsHtml = steps.map(listTemplate)
document.querySelector("#myList").innerHTML = stepsHtml.join("");

const grades = ['A', 'B', 'A']
function convertGPA(grade){
  if (grade == 'A')
  {
    return 4
  }
  else if (grade == 'B')
  {
    return 3
  }

}
const gradePoints = grades.map(convertGPA);
const totalPoints = gradePoints.reduce((total, item) => total + item);
const gpa = totalPoints / gradePoints.length;

document.querySelector("#myList2").innerHTML = gradePoints.join(", ");
document.querySelector("#myList3").innerHTML = gpa;

const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape']
const fruit = fruits.filter((item) => item.length < 6);
document.querySelector("#myList4").innerHTML = fruit.join(", ");

const num = [12, 34, 21, 54];
const luckyNumber = 21;

document.querySelector("#myList5").innerHTML = num.indexOf(luckyNumber);
