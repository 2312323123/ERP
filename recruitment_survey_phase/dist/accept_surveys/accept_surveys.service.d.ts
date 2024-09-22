import { CreateAcceptSurveyDto } from './dto/create-accept_survey.dto';
import { UpdateAcceptSurveyDto } from './dto/update-accept_survey.dto';
export declare class AcceptSurveysService {
    create(createAcceptSurveyDto: CreateAcceptSurveyDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAcceptSurveyDto: UpdateAcceptSurveyDto): string;
    remove(id: number): string;
}
