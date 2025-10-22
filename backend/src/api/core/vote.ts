export class Vote {
  id: string;
  name: string;
  countryCode: string; // ISO-2
  option: string;      // ahora string: 'Baby boy' | 'Baby girl' | 'Baby decides'
  createdAt: Date;

  constructor(id: string, name: string, countryCode: string, option: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.countryCode = countryCode;
    this.option = option as any;
    this.createdAt = createdAt;
  }

  static fromRow(row: any): Vote {
    return new Vote(
      row.id,
      row.name,
      row.country_code,
      String(row.option),
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
