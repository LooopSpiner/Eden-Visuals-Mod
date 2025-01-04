var passages = ['Eden Clearing','Clearing Weeding','Clearing Eden Actions','Eden Porch','Clearing Fondle','Eden Lunch','Eden Cabin','Eden Breakfast','Eden Christmas Meal 2','Eden Read','Eden Sleep Push','Cabin Eden Actions','Eden Cuddle','Eden Cuddle Talk','Eden Hunt','Eden Pillows','Eden Dance','Eden Wounds','Eden Wounds Insist','Eden Wounds Finish','Eden Cuddle Trauma Honest','Eden Cuddle Trauma Honest 2','Eden Cuddle Trauma Honest 3'];
var dancePassages = ['Eden Dance','Eden Valentines Dance','Eden Valentines Dance 2','Eden Valentines Dance 3','Eden Dance Seduce','Eden Radio Intro','Eden Radio Intro 2','Eden Radio Intro 3','Eden Radio Intro 4'];

simpleFrameworks.addto('iModHeader', 'EdenCheck');

simpleFrameworks.addto('BeforeLinkZone', {
    passage: passages,
    widget: 'edenCG',
  });

simpleFrameworks.addto('iModHeader', {
    passage: ["Cabin Sleep","Eden Sleep Push",'Eden Wounds Kiss','Eden Breakfast','Eden Breakfast Push'],
    widget: 'edenCGNoDiff',
  });

simpleFrameworks.addto('iModHeader', {
    passage: dancePassages,
    widget: 'edenCGNoDiff',
  });

simpleFrameworks.addto('iModOptions', 'scaleSetting');