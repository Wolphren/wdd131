// courses.js
const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: 
    [
        { 
            sectionNum: 1, 
            roomNum: 'STC 353', 
            enrolled: 26, 
            days: 'TTh', 
            instructor: 'Bro T'
        },
        { 
            sectionNum: 2, 
            roomNum: 'STC 347', 
            enrolled: 28, 
            days: 'TTh', 
            instructor: 'Sis A'
        }
    ],
    enrollStudent: function (sectionNum) {
        const sectionIndex = this.sections.findIndex(
          (section) => section.sectionNum == sectionNum
        );
        if (sectionIndex >= 0) {
          this.sections[sectionIndex].enrolled++;
          renderTemplate(this.sections);
        }
      },
      dropStudent: function (sectionNum) {
        const sectionIndex = this.sections.findIndex(
          (section) => section.sectionNum == sectionNum
        );
        if (sectionIndex >= 0) {
          this.sections[sectionIndex].enrolled--;
          renderTemplate(this.sections);
        }
      },
    };

  

function setInitialValues(aCourse)
{
    const aCourseName = document.querySelector('#courseName');
    const aCourseCode = document.querySelector('#courseCode');
    aCourseName.textContent = aCourse.name;
    aCourseCode.textContent = aCourse.code;
}

function template(section)
{
    return`<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td></tr>`
}

function renderTemplate(sections)
{
    const insert = sections.map(template);
    document.querySelector('#sections').innerHTML = insert.join("");
}

document.querySelector("#enrollStudent").addEventListener("click", function()
{
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
});

document.querySelector("#dropStudent").addEventListener("click", function()
{
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.dropStudent(sectionNum);
});

setInitialValues(aCourse);
renderTemplate(aCourse.sections);