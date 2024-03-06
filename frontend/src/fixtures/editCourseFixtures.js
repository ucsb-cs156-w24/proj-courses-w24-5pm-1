const editCourseFixtures = {
    oneCourse: [
      {
        quarter: '20221',
        courseId: 'WRIT      1  ',
        title: 'APP TO UNIV WRIT',
        description: 'Principles of critical reading, thinking, and writing in the university. Wr iting focuses on analysis of academic discourse and development of rhetoric al strategies. Completion with a grade of C or better meets Entry Level Wri ting Requirement.',
        classSections: [ [Object] ],
        generalEducation: [ [Object] ],
        finalExam: null,
        id: 72
      },
    ],
    twoCourses:
      [
        {
          quarter: '20221',
          courseId: 'WRIT      1  ',
          title: 'APP TO UNIV WRIT',
          description: 'Principles of critical reading, thinking, and writing in the university. Wr iting focuses on analysis of academic discourse and development of rhetoric al strategies. Completion with a grade of C or better meets Entry Level Wri ting Requirement.',
          classSections: [ [Object] ],
          generalEducation: [ [Object] ],
          finalExam: null,
          id: 72
        },
        {
          quarter: '20221',
          courseId: 'SOC      91  ',
          title: 'GROUP EXP LEARNING',
          description: 'Group experiential learning in a sociological setting as directed by facult y.',
          classSections: [ [Object] ],
          generalEducation: [],
          finalExam: null,
          id: 75
        }
      ]
  };

  const inputEditFixtures = {
    psIdCall: [
      {
        "id": 72,
        "user": {
          "id": 1,
          "email": "christopherwoolson@ucsb.edu",
          "googleSub": "108025665085795353947",
          "pictureUrl": "https://lh3.googleusercontent.com/a/ACg8ocK6Q8G3q4upKsbc-xkOoyHZ719H3otbwG8yTKe1RRDZyw=s96-c",
          "fullName": "Christopher Woolson",
          "givenName": "Christopher",
          "familyName": "Woolson",
          "emailVerified": true,
          "locale": "en",
          "hostedDomain": "ucsb.edu",
          "admin": true
        },
        "enrollCd": "50799",
        "psId": 1
      },
      {
        "id": 75,
        "user": {
          "id": 1,
          "email": "christopherwoolson@ucsb.edu",
          "googleSub": "108025665085795353947",
          "pictureUrl": "https://lh3.googleusercontent.com/a/ACg8ocK6Q8G3q4upKsbc-xkOoyHZ719H3otbwG8yTKe1RRDZyw=s96-c",
          "fullName": "Christopher Woolson",
          "givenName": "Christopher",
          "familyName": "Woolson",
          "emailVerified": true,
          "locale": "en",
          "hostedDomain": "ucsb.edu",
          "admin": true
        },
        "enrollCd": "62083",
        "psId": 1
      }
    ],
    sectionCall: [
      {
        "quarter": "20221",
        "courseId": "WRIT      1  ",
        "title": "APP TO UNIV WRIT",
        "description": "Principles of critical reading, thinking, and writing in the university. Wr iting focuses on analysis of academic discourse and development of rhetoric al strategies. Completion with a grade of C or better meets Entry Level Wri ting Requirement.",
        "classSections": [
          {
            "enrollCode": "50799",
            "section": "0200",
            "session": null,
            "classClosed": "Y",
            "courseCancelled": null,
            "gradingOptionCode": null,
            "enrolledTotal": 24,
            "maxEnroll": 24,
            "secondaryStatus": null,
            "departmentApprovalRequired": false,
            "instructorApprovalRequired": false,
            "restrictionLevel": null,
            "restrictionMajor": null,
            "restrictionMajorPass": null,
            "restrictionMinor": null,
            "restrictionMinorPass": null,
            "concurrentCourses": [],
            "timeLocations": [
              {
                "room": "1513",
                "building": "PHELP",
                "roomCapacity": "25",
                "days": "M W    ",
                "beginTime": "13:00",
                "endTime": "14:50"
              }
            ],
            "instructors": [
              {
                "instructor": "WARWICK N L",
                "functionCode": "Teaching and in charge"
              }
            ]
          }
        ],
        "generalEducation": [
          {
            "geCode": "SUB",
            "geCollege": "UCSB"
          }
        ],
        "finalExam": null
      },
      {
        "quarter": "20221",
        "courseId": "SOC      91  ",
        "title": "GROUP EXP LEARNING",
        "description": "Group experiential learning in a sociological setting as directed by facult y.",
        "classSections": [
          {
            "enrollCode": "62083",
            "section": "0100",
            "session": null,
            "classClosed": null,
            "courseCancelled": null,
            "gradingOptionCode": null,
            "enrolledTotal": 11,
            "maxEnroll": 25,
            "secondaryStatus": null,
            "departmentApprovalRequired": false,
            "instructorApprovalRequired": false,
            "restrictionLevel": null,
            "restrictionMajor": null,
            "restrictionMajorPass": null,
            "restrictionMinor": null,
            "restrictionMinorPass": null,
            "concurrentCourses": [],
            "timeLocations": [],
            "instructors": [
              {
                "instructor": "HAJJAR L",
                "functionCode": "Teaching and in charge"
              }
            ]
          }
        ],
        "generalEducation": [],
        "finalExam": null
      }
    ]

  };
    
  
  export { editCourseFixtures, inputEditFixtures };