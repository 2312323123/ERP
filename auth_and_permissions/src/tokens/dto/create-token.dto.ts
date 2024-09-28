export class CreateTokenDto {
  constructor(
    public id: string,
    public google_access_token?: string,
    public google_refresh_token?: string,
    public google_tokens_expiry?: Date,
    public in_app_refresh_tokens?: Record<string, number>,
  ) {}
}
