export class Booking{
    userName: string;
    packageName: string;
    location: string;
    description: string;
    date: string;
    constructor(userName: string, packageName: string, location: string, description: string, date: string){
        this.userName = userName;
        this.packageName = packageName;
        this.location = location;
        this.description = description;
        this.date = date;
    }
    
}
