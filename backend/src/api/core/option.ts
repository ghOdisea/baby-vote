export class Option {
    id: string;
    label: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, label: string, sortOrder: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.label = label;
        this.sortOrder = sortOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toJSON() {
        return {
            id: this.id,
            label: this.label
        };
    }

    toDTO() {
        return {
            id: this.id,
            label: this.label,
            sort_order: this.sortOrder,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}