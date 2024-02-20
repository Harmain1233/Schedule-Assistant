let ratio = 0; 
    let coursesTakenProgress = 50; 
    let coursesTotal = 100;
    ratio = coursesTakenProgress/coursesTotal;

    let progressStartValue = 0;
    let progressEndValue = ratio*100;   
    let speed = 100;
    
    let progress = setInterval(() => {
        progressStartValue++;
        console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(#3ff983 ${progressStartValue * 3.6}deg, #ededed 0deg)`
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }    
    }, speed);


const coursesByMajor = {
    "Computer Science": {
        'CISC1115': [],
        'MATH1006': ['CISC1115'],
        'ENGLISH1012' : [],
        'MATH1011': ['MATH1006'],
        'CISC3115': ['CISC1115'],
        'MATH1201': ['MATH1011', 'MATH1006'],
        'MATH1206': ['MATH1201'],
        'StatsRequirement': [['MATH2501'], ['MATH3501']],
        'CISC2210': ['CISC1115', 'MATH1011', 'MATH1201', 'ENGLISH1012'],
        'CISC3130': ['CISC3115', 'CISC1115'],
        'CISC3310': ['CISC1115', 'CISC2210','CISC3115'],
        'CISC3140': ['CISC1115', 'CISC3115', 'CISC3130'],
        'CISC3142': ['CISC1115', 'CISC3130', 'CISC3310'],
        'CISC3220': ['CISC2210', 'CISC3130', 'MATH1201'],
        'CISC3230': ['CISC2210', 'CISC3130', 'MATH1201'],
        'CISC3320': ['CISC3305', 'CISC3310', 'CISC3130', 'CISC3315'],
        'CISC2820W':['CISC1115','ENGLISH1012'],
        'CISC4900': ['CISC3130', 'CISC3142'], 
        '3CSElectives': ['CISC3130']
    }  
};

// Get prerequisites based on map for each course
function getPrerequisites(course, major) {
    return coursesByMajor[major][course] || [];
}

function checkRemainingCourses(major, coursesTaken) {
    console.log(coursesTaken);
  
    const remainingCourses = [];
    const courses = coursesByMajor[major];
  
    for (const course in courses) {
        if (!coursesTaken.includes(course)) {
            remainingCourses.push(course); 
        } else {
            const prerequisites = getPrerequisites(course, major);
            prerequisites.forEach(prereq => {
                if (!coursesTaken.includes(prereq)) {
                    coursesTaken.push(prereq);
                    let index = remainingCourses.indexOf(prereq);
                    if (index !== -1) {
                        remainingCourses.splice(index, 1);
                    }
                }
            });
        }
    }
    
    return {
        remainingCourses: remainingCourses,
        updatedCoursesTaken: coursesTaken
    };
}


// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#scheduleForm');
    var newMajor = "Computer Science";
    let coursesTaken = [];
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        coursesTaken = []; // Clear previous selections
        document.querySelectorAll('[type="checkbox"]').forEach(item => {
            if(item.checked === true) {
                coursesTaken.push(item.value);
            }
        });
        console.log(coursesTaken);

        // Calculate and display remaining courses
        var result = checkRemainingCourses(newMajor, coursesTaken);
        var remainingCourses = result.remainingCourses;

        // Update the display of remaining courses
        var remainingCoursesContainer = document.createElement("div");
        remainingCoursesContainer.className = "schedule";
        remainingCoursesContainer.innerHTML = "<strong>Total Remaining Courses:</strong> " + remainingCourses.join(', ');
        
        // Clear previous remaining courses display
        const previousRemainingCoursesContainer = document.querySelector('.schedule');
        if (previousRemainingCoursesContainer) {
            form.removeChild(previousRemainingCoursesContainer);
        }
        
        form.appendChild(remainingCoursesContainer);
    });
});
// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#scheduleForm');
    var newMajor = "Computer Science";
    let coursesTaken = [];
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        coursesTaken = []; // Clear previous selections
        document.querySelectorAll('[type="checkbox"]').forEach(item => {
            if(item.checked === true) {
                coursesTaken.push(item.value);
            }
        });
        console.log(coursesTaken);

        // Calculate and display remaining courses
        var result = checkRemainingCourses(newMajor, coursesTaken);
        var remainingCourses = result.remainingCourses;

        // Update the display of remaining courses
        var remainingCoursesContainer = document.createElement("div");
        remainingCoursesContainer.className = "schedule";
        remainingCoursesContainer.innerHTML = "<strong>Total Remaining Courses:</strong> " + remainingCourses.join(', ');
        
        // Clear previous remaining courses display
        const previousRemainingCoursesContainer = document.querySelector('.schedule');
        if (previousRemainingCoursesContainer) {
            form.removeChild(previousRemainingCoursesContainer);
        }
        
        form.appendChild(remainingCoursesContainer);
    });
});

