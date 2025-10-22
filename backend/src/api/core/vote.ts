export class Vote {
  id: string;
  name: string;
  countryCode: string; // ISO-2
  option: number;      // 1..3
  createdAt: Date;

  constructor(id: string, name: string, countryCode: string, option: number, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.countryCode = countryCode;
    this.option = option;
    this.createdAt = createdAt;
  }

  static fromRow(row: any): Vote {
    return new Vote(
      row.id,
      row.name,
      row.country_code,
      Number(row.option),
      new Date(row.created_at)
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      countryCode: this.countryCode,
      option: this.option,
      createdAt: this.createdAt
    };
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      country_code: this.countryCode,
      option: this.option,
      created_at: this.createdAt
    };
  }
}
