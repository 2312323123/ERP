export class RecruitmentRelatedData {
  grading_instruction: string;
  fieldsNotToShow: Array<string>;
  fieldToDistinctTheSurvey: string;
  evaluationCriteriaSetup: {
    criteria: Array<{
      name: string;
      description: string;
      weight: number;
    }>;
    markTags: {
      mark1Tag: string;
      mark2Tag: string;
      mark3Tag: string;
      mark4Tag: string;
      mark5Tag: string;
    };
  };
}

export class CreateRecruitmentRelatedDataForFrontendDto extends RecruitmentRelatedData {
  isThereAnyMark: boolean;
  isThereAnySurvey: boolean;
  token: string;
}
