
export class Vote {
    id:string;
    name: string
    countryCode: string;
    optionId: string;
    createdAt: Date;

    constructor(id:string, name: string, countryCode: string, optionId: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.countryCode = countryCode;
        this.optionId = optionId;
        this.createdAt = createdAt;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            countryCode: this.countryCode,
            optionId: this.optionId
        };
    }

    toDTO() {
        return {
            id: this.id,
            name: this.name,
            country_code: this.countryCode,
            option_id: this.optionId,
            created_at: this.createdAt
        };
    }
}