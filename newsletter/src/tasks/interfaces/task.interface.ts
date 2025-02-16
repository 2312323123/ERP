export interface TaskForExport {
  uuid: string;
  name: string;
  description: string;
  author_id: string;
  visible_until: Date;
  interested: [
    {
      user_id: string;
    },
  ];
}

export interface TaskForImport {
  name: string;
  description: string;
  visible_until: Date;
}
