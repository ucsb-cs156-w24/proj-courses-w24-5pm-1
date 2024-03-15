package edu.ucsb.cs156.courses.documents;

public class CourseWithScheduleFixtures {
  public static final String ONE_COURSE_WITH_SCHEDULE =
      """
        {
            "personalSchedule": {
                "id": 1,
                "user": {
                        "id": 1,
                        "email": "phtcon@ucsb.edu",
                        "googleSub": "115856948234298493496",
                        "pictureUrl": "https://lh3.googleusercontent.com/-bQynVrzVIrU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmkGuVsELD1ZeV5iDUAUfe6_K-p8w/s96-c/photo.jpg",
                        "fullName": "Phill Conrad",
                        "givenName": "Phill",
                        "familyName": "Conrad",
                        "emailVerified": true,
                        "locale": "en",
                        "hostedDomain": "ucsb.edu",
                        "admin": true
                    },
                "name": "Schedule 1",
                "description": "First test schedule",
                "quarter": "20221"
            },
            "course": {
                "quarter": "20221",
                "courseId": "ARTHI     5B ",
                "title": "INTRO MUSEUM STUDY",
                "description": "Designed to introduce students to various aspects of Museum   Studies- historical, theoretical, and practical- by examining   a range of issues and topics with which the field is engaged.",
                "classSections": [
                {
                    "enrollCode": "59501",
                    "section": "0100",
                    "session": null,
                    "classClosed": "Y",
                    "courseCancelled": null,
                    "gradingOptionCode": null,
                    "enrolledTotal": 94,
                    "maxEnroll": 95,
                    "secondaryStatus": "R",
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
                        "room": "1174",
                        "building": "HSSB",
                        "roomCapacity": "95",
                        "days": " T R   ",
                        "beginTime": "12:30",
                        "endTime": "13:45"
                    }
                    ],
                    "instructors": [
                    {
                        "instructor": "PAUL C",
                        "functionCode": "Teaching and in charge"
                    }
                    ]
                }
                ],
                "generalEducation": [
                {
                    "geCode": "F  ",
                    "geCollege": "L&S "
                },
                {
                    "geCode": "F  ",
                    "geCollege": "ENGR"
                }
                ],
                "finalExam": null
            }
        }""";

  public static final String THREE_COURSES_WITH_SCHEDULES =
      """
        [
            {
                "personalSchedule": {
                    "id": 1,
                    "user": {
                        "id": 1,
                        "email": "phtcon@ucsb.edu",
                        "googleSub": "115856948234298493496",
                        "pictureUrl": "https://lh3.googleusercontent.com/-bQynVrzVIrU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmkGuVsELD1ZeV5iDUAUfe6_K-p8w/s96-c/photo.jpg",
                        "fullName": "Phill Conrad",
                        "givenName": "Phill",
                        "familyName": "Conrad",
                        "emailVerified": true,
                        "locale": "en",
                        "hostedDomain": "ucsb.edu",
                        "admin": true
                    },
                    "name": "My Plan for Winter",
                    "description": "Winter Courses",
                    "quarter": "20221"
                },
                "course": {
                    "quarter": "20221",
                    "courseId": "PSY     197A ",
                    "title": "HONORS RESEARCH",
                    "description": "Independent study under supervision of faculty member, involving either des ign and execution of independent research project or scholarly analysis and critique of theoretical and research literature pertaining to substantial issues. Honors thesis qualifies student for distinction in major upon gradu ation.",
                    "classSections": [
                        {
                            "enrollCode": "46342",
                            "section": "0100",
                            "session": null,
                            "classClosed": null,
                            "courseCancelled": null,
                            "gradingOptionCode": null,
                            "enrolledTotal": null,
                            "maxEnroll": null,
                            "secondaryStatus": null,
                            "departmentApprovalRequired": true,
                            "instructorApprovalRequired": false,
                            "restrictionLevel": null,
                            "restrictionMajor": null,
                            "restrictionMajorPass": null,
                            "restrictionMinor": null,
                            "restrictionMinorPass": null,
                            "concurrentCourses": [],
                            "timeLocations": [],
                            "instructors": []
                        }
                    ],
                    "generalEducation": [],
                    "finalExam": null
                }
            },
            {
                "personalSchedule": {
                    "id": 2,
                    "user": {
                        "id": 1,
                        "email": "phtcon@ucsb.edu",
                        "googleSub": "115856948234298493496",
                        "pictureUrl": "https://lh3.googleusercontent.com/-bQynVrzVIrU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmkGuVsELD1ZeV5iDUAUfe6_K-p8w/s96-c/photo.jpg",
                        "fullName": "Phill Conrad",
                        "givenName": "Phill",
                        "familyName": "Conrad",
                        "emailVerified": true,
                        "locale": "en",
                        "hostedDomain": "ucsb.edu",
                        "admin": true
                    },
                    "name": "Schedule 2",
                    "description": "test",
                    "quarter": "20221"
                },
                "course": {
                    "quarter": "20221",
                    "courseId": "ANTH    131CA",
                    "title": "CA INDIGENOUS PPLS",
                    "description": "Investigation of the diversity of California Indian societies at the beginn ing of European colonization, including social organization, economy, mater ial culture, and ideology. Also considered are origins and historic changes . Emphasis is placed on central and southern California.",
                    "classSections": [
                        {
                            "enrollCode": "53025",
                            "section": "0100",
                            "session": null,
                            "classClosed": null,
                            "courseCancelled": null,
                            "gradingOptionCode": null,
                            "enrolledTotal": 78,
                            "maxEnroll": 95,
                            "secondaryStatus": null,
                            "departmentApprovalRequired": false,
                            "instructorApprovalRequired": false,
                            "restrictionLevel": "U",
                            "restrictionMajor": null,
                            "restrictionMajorPass": null,
                            "restrictionMinor": null,
                            "restrictionMinorPass": null,
                            "concurrentCourses": [],
                            "timeLocations": [
                                {
                                    "room": "1174",
                                    "building": "HSSB",
                                    "roomCapacity": "95",
                                    "days": "M W    ",
                                    "beginTime": "11:00",
                                    "endTime": "12:15"
                                }
                            ],
                            "instructors": [
            {
              "instructor": "JOHNSON J R",
              "functionCode": "Teaching and in charge"
            }
          ]
        }
      ],
      "generalEducation": [],
      "finalExam": null
    }
  },
  {
    "personalSchedule": {
      "id": 2,
                  "user": {
                        "id": 1,
                        "email": "phtcon@ucsb.edu",
                        "googleSub": "115856948234298493496",
                        "pictureUrl": "https://lh3.googleusercontent.com/-bQynVrzVIrU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmkGuVsELD1ZeV5iDUAUfe6_K-p8w/s96-c/photo.jpg",
                        "fullName": "Phill Conrad",
                        "givenName": "Phill",
                        "familyName": "Conrad",
                        "emailVerified": true,
                        "locale": "en",
                        "hostedDomain": "ucsb.edu",
                        "admin": true
                    },
      "name": "Schedule 2",
      "description": "I do what i want",
      "quarter": "20221"
    },
    "course": {
      "quarter": "20221",
      "courseId": "PSY     197A ",
      "title": "HONORS RESEARCH",
      "description": "Independent study under supervision of faculty member, involving either des ign and execution of independent research project or scholarly analysis and critique of theoretical and research literature pertaining to substantial issues. Honors thesis qualifies student for distinction in major upon gradu ation.",
      "classSections": [
        {
          "enrollCode": "46342",
          "section": "0100",
          "session": null,
          "classClosed": null,
          "courseCancelled": null,
          "gradingOptionCode": null,
          "enrolledTotal": null,
          "maxEnroll": null,
          "secondaryStatus": null,
          "departmentApprovalRequired": true,
          "instructorApprovalRequired": false,
          "restrictionLevel": null,
          "restrictionMajor": null,
          "restrictionMajorPass": null,
          "restrictionMinor": null,
          "restrictionMinorPass": null,
          "concurrentCourses": [],
          "timeLocations": [],
          "instructors": []
        }
      ],
      "generalEducation": [],
      "finalExam": null
    }
  }
]
""";
}
