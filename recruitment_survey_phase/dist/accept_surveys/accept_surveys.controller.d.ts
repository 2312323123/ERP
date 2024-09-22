import { AcceptSurveysService } from './accept_surveys.service';
import { CreateAcceptSurveyDto } from './dto/create-accept_survey.dto';
import { UpdateAcceptSurveyDto } from './dto/update-accept_survey.dto';
export declare class AcceptSurveysController {
    private readonly acceptSurveysService;
    constructor(acceptSurveysService: AcceptSurveysService);
    create(createAcceptSurveyDto: CreateAcceptSurveyDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAcceptSurveyDto: UpdateAcceptSurveyDto): string;
    remove(id: string): string;
}
