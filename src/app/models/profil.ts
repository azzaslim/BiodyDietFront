export class Profils {
  
        nom? : string;
        prenom? : string;
        date? : Date;
        constructor(args: Profils = {}) {
        this.nom = args.nom;
        this.prenom = args.prenom;
        this.date = args.date;
        }
        }

