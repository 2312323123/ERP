export class CreateRecruitmentDto {
  constructor(
    public name: string,
    public copy_from_uuid?: string,
    public grading_instruction?: string,
    public field_to_distinct_the_survey?: string,
  ) {}
}
