import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    user_name:string
    password:string
    email:string
    
}

