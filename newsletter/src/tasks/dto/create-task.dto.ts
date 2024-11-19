export class CreateTaskDto {
  name: string;
  description: string;
  author_id: string;
  visible_until: Date;
}
