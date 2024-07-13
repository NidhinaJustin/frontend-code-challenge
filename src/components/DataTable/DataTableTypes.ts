export interface UserData{
    id:number,
    name:string,
    age:number,
    city:string
}
export interface ColumnHeader{
    name:string,
    isChecked?:boolean
}
export interface SortTypes{
    key: string,
    direction: string
}