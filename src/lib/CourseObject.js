class CourseObject {
  constructor(hash) {
    this.data = hash.data
    this.updated = hash.updated
    this.metadata = hash.metadata
  }

  get name() {
    var cname = this.data.learningopportunity_name[0].text;
    if ( this.data.realisation_type_code == 5 || this.data.realisation_type_code == 22 ) {
      cname = this.data.realisation_name[0].text; 
    }

    var gname = "";
    if ( this.data.realisation_type_code == 7 ) {
      gname = ", " + this.data.realisation_name[0].text;
    }

    return cname + gname;
  }

  get id() {
    return this.data.course_id
  }

  get organisation() {
    return this.data.organisations[0].code
  }

  get code() {
    return this.data.learningopportunity_id
  }  

  get students() {
    return this.data.students
  }  

  get child_ids() {
    return this.data.child_ids.map(c=>c.course_id)
  }  

  get type() {
    const code = this.data.realisation_type_code
    if ( code==5 ) {
      return "course";
    } else if (code==7) {
      return "group";
    } else if (code==8) {
      return "exam";
    } else if (code==10) {
      return "seminar";          
    } else if (code==22) {
      return "lab";
    } else {
      return "unknown "+code;   
    } 
  }  
 
  matches(filter) {
    if ( filter==='all' ) {
      return true
    }
    return filter === this.type
  }

  get time() {
    const to_s = function(d){
      var dd = new Date(d);

      return dd.getDate() + "." + (1+dd.getMonth()) + "." + (1900+dd.getYear());
    };
    const to_wday = function(event){
      if ( event.weekday_code==1) {
        return "mo";  
      }
      if ( event.weekday_code==2) {
        return "tu";  
      }
      if ( event.weekday_code==3) {
        return "we";  
      }     
      if ( event.weekday_code==4) {
        return "th";  
      }
      if ( event.weekday_code==5) {
        return "fr";  
      }   
      if ( event.weekday_code==6) {
        return "sa";  
      }
      if ( event.weekday_code==7) {
        return "su";  
      }     
      return "unknow date "+ event.weekday_code;                             
    };
    const to_time = function(event){
      var ds = new Date(event.start_date);
      var de = new Date(event.end_date);

      return ds.getHours() + "-" + de.getHours();
    };
    const to_room = function(event){
      if ( event.room_name_short==null ) {
        return "no room allocation";
      }

      return event.room_name_short;
    };

    const code = this.data.realisation_type_code;

    if ( code==5 || code==22 ) {
      return to_s(this.data.start_date) + " - " + to_s(this.data.end_date); 
    } else if (code==7) {
      if (this.data.events.length==0) {
        return "no time allocaton";
      };
      const event = this.data.events[0];

      return to_wday(event)+" "+to_time(event)+" "+to_room(event); 
    } else if (code==8) {
      return to_s(this.data.start_date);
    } else {
      return to_s(this.data.start_date) + " - " + to_s(this.data.end_date);
    }   
  }
}

export const asCourseObject = (hash) => { return new CourseObject(hash) }

export default CourseObject