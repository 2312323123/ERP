import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ResponseDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional() // marked as optional since it can be null or missing
  @IsArray()
  answer: string[] | string | null; // can be an array of strings, a single string, or null
}

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsOptional() // timestamp can be omitted if you want the default to apply
  timestamp?: string; // can also be ISO string, but let's keep it flexible

  @IsArray()
  @IsNotEmpty({ each: true }) // ensure the array is not empty
  responses: ResponseDto[];
}
