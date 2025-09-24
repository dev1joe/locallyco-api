export interface createProductDTO {
    name: string,
    description: string,
    category_id: number,
    brand_id: number,
    versioning: Object
}

export interface productDTO extends createProductDTO {
    id: number,
    created_at: string,
    updated_at?: string,
    deleted_at?: string,
}