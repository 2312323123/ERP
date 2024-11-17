import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ExtendedFields } from 'src/app.service';

interface GivenUuidsProps {
  authHeader: string;
  settings: { fieldToDistinctTheSurvey2Value: string };
  survey_uuids: string[];
}

interface AllProps {
  authHeader: string;
  settings: { fieldToDistinctTheSurvey2Value: string };
}

// Define the type of the response expected from the API
interface SurveyDistinctiveFieldsResponse {
  data: unknown; // Replace `unknown` with the actual shape of your API response
}

@Injectable()
export class RetrieveSurveysDistinctiveFieldsService {
  constructor(private readonly httpService: HttpService) {}

  async retrieveSurveysDistinctiveFieldsForGivenUuids({
    authHeader,
    settings,
    survey_uuids,
  }: GivenUuidsProps): Promise<ExtendedFields> {
    const url = 'http://recruitment_survey_phase:3000/api/surveys/recruits-distinct-fields';
    const headers = {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
    const body = {
      settings,
      survey_uuids,
    };

    try {
      const response = await lastValueFrom<SurveyDistinctiveFieldsResponse>(
        this.httpService.post<SurveyDistinctiveFieldsResponse>(url, body, { headers }),
      );
      return response.data as ExtendedFields; // Return the response
    } catch (error) {
      console.error('Error fetching surveys:', error.message);
      throw new InternalServerErrorException('Failed to retrieve surveys distinctive fields.');
    }
  }

  async retrieveAllSurveysDistinctiveFields({ authHeader, settings }: AllProps): Promise<ExtendedFields> {
    const url = 'http://recruitment_survey_phase:3000/api/surveys/recruits-distinct-fields-all';
    const headers = {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
    const body = { settings };

    try {
      const response = await lastValueFrom<SurveyDistinctiveFieldsResponse>(
        this.httpService.post<SurveyDistinctiveFieldsResponse>(url, body, { headers }),
      );
      return response.data as ExtendedFields; // Return the response
    } catch (error) {
      console.error('Error fetching all surveys:', error.message);
      throw new InternalServerErrorException('Failed to retrieve all surveys distinctive fields.');
    }
  }
}
