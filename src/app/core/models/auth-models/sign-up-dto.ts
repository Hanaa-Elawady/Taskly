export interface SignUpDto {
email: string;
password: string;
data : SignUpPersonalDataDto;
}

export interface SignUpPersonalDataDto {
name: string;
department: string;
}
