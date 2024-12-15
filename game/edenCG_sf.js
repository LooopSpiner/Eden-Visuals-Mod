var passages = ['Eden Clearing','Clearing Weeding','Clearing Eden Actions','Eden Porch','Clearing Fondle','Eden Lunch',"Eden Shoot","Eden Shoot First Focus","Eden Shoot Focus",'Eden Cabin','Eden Breakfast','Eden Breakfast 2','Eden Christmas Meal 2','Eden Read','Eden Caged Intro','Eden Caged','Eden Caged Caught','Eden Caged Evening','Eden Sleep Push','Cabin Eden Actions','Eden Cuddle','Eden Cuddle Talk','Eden Hunt','Eden Pillows','Eden Caged Breakfast','Eden Caged Escape','Eden Dance','Eden Wounds','Eden Wounds Insist','Eden Wounds Finish','Eden Cuddle Trauma Honest','Eden Cuddle Trauma Honest 2','Eden Cuddle Trauma Honest 3'];

simpleFrameworks.addto('iModHeader', 'EdenCheck');

simpleFrameworks.addto('BeforeLinkZone', {
    passage: passages,
    widget: 'edenCG',
  });

simpleFrameworks.addto('iModHeader', {
    passage: ["Cabin Sleep","Eden Sleep Push",'Eden Wounds Kiss'],
    widget: 'edenCGNoDiff',
  });
simpleFrameworks.addto('iModOptions', 'scaleSetting');