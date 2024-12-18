var passages = ['Eden Clearing','Clearing Weeding','Clearing Eden Actions','Eden Porch','Clearing Fondle','Eden Lunch','Eden Cabin','Eden Breakfast','Eden Christmas Meal 2','Eden Read','Eden Sleep Push','Cabin Eden Actions','Eden Cuddle','Eden Cuddle Talk','Eden Hunt','Eden Pillows','Eden Dance','Eden Wounds','Eden Wounds Insist','Eden Wounds Finish','Eden Cuddle Trauma Honest','Eden Cuddle Trauma Honest 2','Eden Cuddle Trauma Honest 3'];

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